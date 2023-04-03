import * as bcrypt from 'bcrypt';
import UserModel from '@server/models/user.model';
import { TUser } from '@server/schema/user.schema';
import ErrorResponse, { ConflictErrorRequest } from '@server/core/error.response';
import { generateKey } from '@server/helpers/generateKey';
import { createTokenPair } from '@server/auth/authUtils';
import KeyService from './key.service';
import { getInfoData } from '@server/helpers';

class AccessService {
  static async signUp(body: TUser) {
    const { username, email, password, firstName, address, lastName, phoneNumber } = body;
    const holderUser = await UserModel.findOne({
      $or: [
        {
          username,
        },
        { email },
      ],
    }).lean();

    if (holderUser) {
      throw new ConflictErrorRequest('Username or email already registered!');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      username,
      email,
      password: passwordHash,
      firstName,
      address,
      lastName,
      phoneNumber,
    });
    if (!newUser) throw new ErrorResponse({});
    const { publicKey, privateKey } = await generateKey();

    await KeyService.createKeyToken({
      user: newUser._id,
      publicKey,
      refreshToken: [],
    });
    const tokens = await createTokenPair({ _id: newUser._id, username: newUser.username }, publicKey, privateKey);
    return {
      user: getInfoData(newUser, ['_id', 'username', 'email']),
      tokens,
    };
  }
}

export default AccessService;
