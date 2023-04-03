import * as bcrypt from 'bcrypt';
import UserModel from '@server/models/user.model';
import { TUser, userSchema } from '@server/schema/user.schema';
import { ConflictErrorRequest } from '@server/core/error.response';

class AccessService {
  static async signUp(body: TUser) {
    if (!userSchema.safeParse(body).success) throw new Error();
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
      throw new ConflictErrorRequest('Username already registered!');
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
    return newUser;
  }
}

export default AccessService;
