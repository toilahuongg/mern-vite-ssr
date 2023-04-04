import { AuthFailureError, NotFoundError } from '@server/core/error.response';
import { asyncHandler } from '.';
import KeyService from '@server/services/key.service';
import { Types } from 'mongoose';
import { verifyToken } from '@server/utils/token';
import { TUserEncrypt } from '@server/schema/user.schema';

const HEADER = {
  CLIENT_ID: 'x-client-id',
  AUTHORIZATION: 'authorization',
};

/*
  - Check userId
  - Get accessToken
  - Get keyStore
  - Decode token
  - Check keyStore with this userId
  - OK => next()
*/
export const authentication = asyncHandler(async (req, res, next) => {
  const userId = req.headers[HEADER.CLIENT_ID] as string;
  if (!userId) throw new AuthFailureError('Missing Client ID!');

  const bearerToken = req.headers[HEADER.AUTHORIZATION] as string;
  if (!bearerToken || !bearerToken.includes('Bearer ')) throw new AuthFailureError('Missing Bearer AccessToken!');

  let accessToken = '';
  try {
    accessToken = bearerToken.split(' ')[1];
  } catch (error) {
    console.log('Detech accessToken::', error);
    throw new AuthFailureError('Invalid AccessToken!');
  }

  const keyStore = await KeyService.getKeyPair(new Types.ObjectId(userId));
  if (!keyStore) throw new NotFoundError('Not found keyStore!');

  let decoded: TUserEncrypt;
  try {
    decoded = (await verifyToken(accessToken, keyStore.publicKey)) as TUserEncrypt;
  } catch (error) {
    console.log('Decoded token::', error);
    throw new AuthFailureError('Invalid AccessToken!');
  }

  console.log(decoded);
  if (userId !== decoded.userId) throw new AuthFailureError('Invalid Client ID');
  req.userId = new Types.ObjectId(userId);
  return next();
});
