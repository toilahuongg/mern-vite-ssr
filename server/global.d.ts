import { Types } from 'mongoose';
import { TDevice } from './schema/key.schema';

declare global {
  namespace Express {
    interface Request {
      userId?: Types.ObjectId | undefined;
      device?: TDevice | undefined;
      deviceId?: Types.ObjectId | undefined;
    }
  }
}
