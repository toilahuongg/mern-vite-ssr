import KeyModel from '@server/models/key.model';
import { TDevice, TKey, TUpdateRefreshToken } from '@server/schema/key.schema';
import { Types } from 'mongoose';

export default class KeyService {
  static async createKeyToken({ user, publicKey, privateKey, devices }: TKey): Promise<TDevice> {
    try {
      const tokens = await KeyModel.create({
        user,
        publicKey,
        privateKey,
        devices,
      });
      return tokens.devices[0];
    } catch (error) {
      console.log('createKeyToken::', error);
      throw error;
    }
  }

  static async updateRefreshToken({ user, publicKey, privateKey, newDevice }: TUpdateRefreshToken): Promise<TDevice> {
    try {
      const key = await KeyModel.findOne({ user }, { _id: 0, devices: 1, refreshTokensUsed: 1 }).lean();
      if (!key)
        return await this.createKeyToken({ user, publicKey, privateKey, devices: [newDevice], refreshTokensUsed: [] });

      key.devices.push(newDevice);

      if (key.devices.length > 10) {
        const device = key.devices.splice(0, 1)[0];
        key.refreshTokensUsed.push(device.refreshToken);
      }

      const tokens = (await KeyModel.findOneAndUpdate(
        {
          user,
        },
        key,
        { new: true },
      ))!;
      return tokens.devices[tokens.devices.length - 1];
    } catch (error) {
      console.log('updateRefreshToken::', error);
      throw error;
    }
  }

  static getKeyPair(user: Types.ObjectId): Promise<{ publicKey: string; privateKey: string } | null> {
    return KeyModel.findOne({ user }, { _id: 0, publicKey: 1, privateKey: 1 }).lean();
  }

  static getDevice(id: Types.ObjectId) {
    return KeyModel.findOne({ 'devices._id': id }).lean();
  }

  static async removeDevice(user: Types.ObjectId, id: Types.ObjectId): Promise<Types.ObjectId> {
    await KeyModel.updateOne(
      {
        user,
      },
      {
        $pull: {
          devices: { _id: id },
        },
      },
    );
    return id;
  }
}
