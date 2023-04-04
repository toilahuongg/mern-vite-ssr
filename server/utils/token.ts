import * as JWT from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import appConfig from '@server/configs/app.config';

dotenv.config();

export const generateToken = (payload: string | Buffer | object, privateKey: string) => {
  return JWT.sign(
    payload,
    {
      key: privateKey,
      passphrase: appConfig.app.secretKey,
    },
    { algorithm: 'RS256', expiresIn: '2 days' },
  );
};

export const createTokenPair = (
  payload: string | Buffer | object,
  privateKey: string,
): Promise<{ accessToken: string; refreshToken: string }> =>
  new Promise(async (resolve, reject) => {
    try {
      const accessToken = generateToken(payload, privateKey);
      const refreshToken = generateToken(payload, privateKey);
      resolve({ accessToken, refreshToken });
    } catch (error) {
      reject(error);
    }
  });

export const verifyToken = (token: string, publicKey: string) =>
  new Promise((resolve, reject) => {
    JWT.verify(token, publicKey, (err, decode) => {
      if (err) {
        reject(err);
      } else {
        resolve(decode);
      }
    });
  });
