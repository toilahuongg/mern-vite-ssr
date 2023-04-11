import bcrypt from 'bcrypt';
import AccountModel from '@server/models/account.model';
import ErrorResponse, { AuthFailureError, ConflictError } from '@server/core/error.response';
import { generateKey } from '@server/helpers/generateKey';
import { createTokenPair, generateToken, verifyToken } from '@server/helpers/token';
import KeyService from './key.service';
import { getInfoData } from '@server/helpers';
import { z } from 'zod';
import {
  changeInformationValidator,
  changePasswordValidator,
  loginValidator,
  signUpValidator,
} from '@server/validators/account.validator';
import { TDevice } from '@server/schema/key.schema';
import { TRefreshTokenSchema, TAccountEncrypt } from '@server/schema/account.schema';
import { Types } from 'mongoose';
import { ForbiddenError } from '@server/core/error.response';
import appConfig from '@server/configs/app.config';
import { NotFoundError } from '@server/core/error.response';
import { TRole } from '@server/schema/role.schema';

class AccountService {
  static async signUp(body: z.infer<typeof signUpValidator.shape.body>, device: TDevice) {
    const { username, email, password } = body;
    const holderUser = await AccountModel.findOne({
      $or: [
        {
          username,
        },
        { email },
      ],
    }).lean();

    if (holderUser) {
      throw new ConflictError('Username or email already registered!');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await AccountModel.create({
      username,
      email,
      password: passwordHash,
    });
    if (!newUser) throw new ErrorResponse({});
    const { publicKey, privateKey } = await generateKey();

    const tokens = await createTokenPair(
      <TAccountEncrypt>{ accountId: newUser._id.toString(), username: newUser.username },
      privateKey,
    );

    device.refreshToken = tokens.refreshToken;
    const newDevice = await KeyService.createKeyToken({
      account: newUser._id,
      publicKey,
      privateKey,
      devices: [device],
      refreshTokensUsed: [],
    });
    return {
      user: getInfoData(newUser, ['_id', 'username', 'email']),
      tokens,
      deviceId: newDevice._id,
    };
  }

  /*
    1. Check username or email
    2. Match password
    3. Get publicKey, privateKey in KeyModel
    4. if not exists key, create new publicKey and privateKey
    5. Create new accessToken and refreshToken
    6. Add new refreshToken to KeyModel
    7. Result
  */
  static async login(body: z.infer<typeof loginValidator.shape.body>, device: TDevice) {
    const { account, password } = body;

    const foundUser = await AccountModel.findOne({
      $or: [
        {
          username: account,
        },
        { email: account },
      ],
    }).lean();
    if (!foundUser) throw new AuthFailureError('Incorrect username, email or password!');

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) throw new AuthFailureError('Incorrect username, email or password!');

    let keyPair = await KeyService.getKeyPair(foundUser._id);
    if (!keyPair) keyPair = await generateKey();

    const { publicKey, privateKey } = keyPair;

    const tokens = await createTokenPair(
      <TAccountEncrypt>{ accountId: foundUser._id.toString(), username: foundUser.username },
      privateKey,
    );
    device.refreshToken = tokens.refreshToken;

    const newDevice = await KeyService.updateRefreshToken({
      account: foundUser._id,
      publicKey,
      privateKey,
      newDevice: device,
    });

    return {
      user: getInfoData(foundUser, ['_id', 'username', 'email', 'firstName', 'lastName', 'phoneNumber', 'phoneNumber']),
      tokens,
      deviceId: newDevice._id,
    };
  }

  static async logout(accountId: Types.ObjectId, deviceId: Types.ObjectId) {
    return KeyService.removeDevice(accountId, deviceId);
  }
  static async refreshToken({ refreshToken, deviceId }: TRefreshTokenSchema) {
    const foundRefreshTokensUsed = await KeyService.findInRefreshTokensUsed(refreshToken);
    if (foundRefreshTokensUsed) {
      await KeyService.removeAllRefreshToken(foundRefreshTokensUsed._id);
      throw new ForbiddenError('Something went wrong! Please relogin');
    }

    const foundKey = await KeyService.findByDeviceIdAndRefreshToken(deviceId, refreshToken);
    if (!foundKey) throw new AuthFailureError('Invalid RefreshToken or Device ID');

    let decoded: TAccountEncrypt;
    try {
      decoded = (await verifyToken(refreshToken, foundKey.publicKey)) as TAccountEncrypt;
    } catch (error) {
      console.log('Decoded refreshToken::', error);
      await KeyService.addToRefreshTokensUsed(foundKey._id, refreshToken);
      throw new AuthFailureError('Invalid RefreshToken!');
    }

    const { accountId, username } = decoded;
    const accessToken = generateToken({ accountId, username }, foundKey.privateKey, appConfig.app.tokenExpiresIn);
    return {
      accessToken,
    };
  }

  static async changePassword(accountId: Types.ObjectId, body: z.infer<typeof changePasswordValidator.shape.body>) {
    const { oldPassword, newPassword } = body;

    const foundUser = await AccountModel.findOne({ _id: accountId }).lean();
    if (!foundUser) throw new AuthFailureError('Authorization failed');

    const match = await bcrypt.compare(oldPassword, foundUser.password);
    if (!match) throw new AuthFailureError('Incorrect old password!');

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await AccountModel.updateOne({ _id: accountId }, { password: passwordHash });

    return {};
  }

  static async changeInformation(
    accountId: Types.ObjectId,
    body: z.infer<typeof changeInformationValidator.shape.body>,
  ) {
    const { firstName, lastName, phoneNumber, address } = body;

    const user = await AccountModel.findByIdAndUpdate(
      accountId,
      { firstName, lastName, phoneNumber, address },
      { new: true },
    ).lean();
    if (!user) throw new NotFoundError('Account not found!');

    return getInfoData(user, ['firstName', 'lastName', 'phoneNumber', 'address']);
  }

  static async getRolesById(accountId: Types.ObjectId) {
    const user = await AccountModel.findById(accountId, { roles: 1 }).populate<{ roles: [TRole] }>('roles').lean();
    if (!user) throw new NotFoundError('Account not found!');

    return user.roles;
  }
}

export default AccountService;
