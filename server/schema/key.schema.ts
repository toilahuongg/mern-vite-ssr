import { Types } from 'mongoose';
import { object, z } from 'zod';

export const keySchema = object({
  _id: z.instanceof(Types.ObjectId).optional(),
  user: z.instanceof(Types.ObjectId),
  publicKey: z.string(),
  refreshToken: z.array(z.string()),
});

export type TKey = z.infer<typeof keySchema>;
