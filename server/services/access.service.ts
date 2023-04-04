import * as bcrypt from 'bcrypt';
import UserModel from '@server/models/user.model';
import ErrorResponse, { AuthFailureError, ConflictError } from '@server/core/error.response';
import { generateKey } from '@server/helpers/generateKey';
import { createTokenPair } from '@server/utils/token';
import KeyService from './key.service';
import { getInfoData } from '@server/helpers';
import { z } from 'zod';
import { loginValidator, signUpValidator } from '@server/validators/access.validator';
import { TDevice } from '@server/schema/key.schema';
import { TUserEncrypt } from '@server/schema/user.schema';

class AccessService {
  static async signUp(body: z.infer<typeof signUpValidator.shape.body>, device: TDevice) {
    const { username, email, password } = body;
    const holderUser = await UserModel.findOne({
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
    const newUser = await UserModel.create({
      username,
      email,
      password: passwordHash,
    });
    if (!newUser) throw new ErrorResponse({});
    const { publicKey, privateKey } = await generateKey();

    const tokens = await createTokenPair(
      <TUserEncrypt>{ userId: newUser._id.toString(), username: newUser.username },
      privateKey,
    );

    device.refreshToken = tokens.refreshToken;
    await KeyService.createKeyToken({
      user: newUser._id,
      publicKey,
      privateKey,
      devices: [device],
      refreshTokensUsed: [],
    });
    return {
      user: getInfoData(newUser, ['_id', 'username', 'email']),
      tokens,
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

    const foundUser = await UserModel.findOne({
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
      <TUserEncrypt>{ userId: foundUser._id.toString(), username: foundUser.username },
      privateKey,
    );
    device.refreshToken = tokens.refreshToken;

    await KeyService.updateRefreshToken({
      user: foundUser._id,
      publicKey,
      privateKey,
      newDevice: device,
    });

    return {
      user: getInfoData(foundUser, ['_id', 'username', 'email', 'firstName', 'lastName', 'phoneNumber']),
      tokens,
    };
  }
}

export default AccessService;
