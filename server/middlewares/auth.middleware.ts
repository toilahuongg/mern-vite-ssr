import { AuthFailureError } from '@server/core/error.response';
import { asyncHandler } from '.';
import KeyService from '@server/services/key.service';
import { Types } from 'mongoose';
import { verifyToken } from '@server/utils/token';
import { TUserEncrypt } from '@server/schema/user.schema';
import HEADERS from '@server/utils/headers';

/*
  - Check userId
  - Check device-id
  - Get accessToken
  - Get keyStore
  - Decode token
  - Check keyStore with this userId
  - OK => next()
*/
export const authentication = asyncHandler(async (req, res, next) => {
  const userId = req.headers[HEADERS.CLIENT_ID] as string;
  if (!userId) throw new AuthFailureError('Missing Client ID!');

  const deviceId = req.headers[HEADERS.DEVICE_ID] as string;
  if (!deviceId) throw new AuthFailureError('Missing Device ID!');

  const foundKey = await KeyService.findByDeviceUserId(new Types.ObjectId(deviceId), new Types.ObjectId(userId));
  if (!foundKey) throw new AuthFailureError('Invalid Device ID or Client ID!');

  if (req.headers[HEADERS.REFRESH_TOKEN]) {
    try {
      const refreshToken = req.headers[HEADERS.REFRESH_TOKEN] as string;
      const decoded = (await verifyToken(refreshToken, foundKey.publicKey)) as TUserEncrypt;
      if (decoded.userId !== userId) throw new AuthFailureError('Invalid Client ID');
      req.userId = new Types.ObjectId(userId);
      req.deviceId = new Types.ObjectId(deviceId);
      req.refreshToken = refreshToken;
      return next();
    } catch (error) {
      throw error;
    }
  }

  const bearerToken = req.headers[HEADERS.AUTHORIZATION] as string;
  if (!bearerToken || !bearerToken.includes('Bearer ')) throw new AuthFailureError('Missing Bearer AccessToken!');

  let accessToken = '';
  try {
    accessToken = bearerToken.split(' ')[1];
  } catch (error) {
    console.log('Detech accessToken::', error);
    throw new AuthFailureError('Invalid AccessToken!');
  }

  let decoded: TUserEncrypt;
  try {
    decoded = (await verifyToken(accessToken, foundKey.publicKey)) as TUserEncrypt;
  } catch (error) {
    console.log('Decoded token::', error);
    throw new AuthFailureError('Invalid AccessToken!');
  }

  if (userId !== decoded.userId) throw new AuthFailureError('Invalid Client ID');
  req.userId = new Types.ObjectId(userId);
  req.deviceId = new Types.ObjectId(deviceId);
  return next();
});
