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
  // static async removeRefreshToken({
  //   user,
  //   publicKey,
  //   privateKey,
  //   oldRefreshToken,
  //   newDevice,
  // }: TUpdateRefreshToken): Promise<TKey> {
  //   try {
  //     const key = await KeyModel.findOne({ user }, { _id: 0, devices: 1, refreshTokensUsed: 1 }).lean();
  //     if (!key)
  //       return await this.createKeyToken({ user, publicKey, privateKey, devices: [newDevice], refreshTokensUsed: [] });

  //     if (oldRefreshToken) {
  //       key.devices.filter(({ refreshToken }) => refreshToken !== oldRefreshToken);
  //       key.refreshTokensUsed.push(oldRefreshToken);
  //     }

  //     const idx = key.devices.findIndex(({ hash }) => hash === newDevice.hash);
  //     if (idx >= 0) key.devices[idx].refreshToken = newDevice.refreshToken;
  //     else key.devices.push(newDevice);

  //     if (key.devices.length > 10) {
  //       const device = key.devices.splice(0, 1)[0];
  //       key.refreshTokensUsed.push(device.refreshToken);
  //     }

  //     const tokens = await KeyModel.findOneAndUpdate(
  //       {
  //         user,
  //       },
  //       key,
  //       { new: true },
  //     );
  //     return tokens!;
  //   } catch (error) {
  //     console.log('updateRefreshToken::', error);
  //     throw error;
  //   }
  // }
}
