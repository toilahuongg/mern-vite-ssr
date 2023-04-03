import KeyModel from '@server/models/key.model';
import { TKey } from '@server/schema/key.schema';

export default class KeyService {
  static async createKeyToken({ user, publicKey }: TKey): Promise<TKey> {
    const tokens = await KeyModel.create({
      user,
      publicKey,
    });
    return tokens;
  }
}
