import * as JWT from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export const createTokenPair = (
  payload: any,
  publicKey: string,
  privateKey: string,
): Promise<{ accessToken: string; refreshToken: string }> =>
  new Promise(async (resolve, reject) => {
    try {
      const accessToken = JWT.sign(
        payload,
        {
          key: privateKey,
          passphrase: process.env.SECRET_KEY!,
        },
        { algorithm: 'RS256', expiresIn: '2 days' },
      );
      const refreshToken = JWT.sign(
        payload,
        {
          key: privateKey,
          passphrase: process.env.SECRET_KEY!,
        },
        { algorithm: 'RS256', expiresIn: '7 days' },
      );

      JWT.verify(accessToken, publicKey, (err, decode) => {
        if (err) {
          console.error(`error:: ${err}`);
        } else {
          console.log('decode:', decode);
        }
      });
      resolve({ accessToken, refreshToken });
    } catch (error) {
      reject(error);
    }
  });
