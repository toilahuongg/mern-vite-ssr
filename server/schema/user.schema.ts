import { Types } from 'mongoose';
import { z } from 'zod';

export const userSchema = z.object({
  _id: z.instanceof(Types.ObjectId).optional(),
  username: z.string(),
  password: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
});

export const userEncryptSchema = z.object({
  userId: z.string(),
  username: z.string(),
});

export const refreshTokenSchema = z.object({
  deviceId: z.instanceof(Types.ObjectId),
  refreshToken: z.string(),
});

export type TUserEncrypt = z.infer<typeof userEncryptSchema>;
export type TUser = z.infer<typeof userSchema>;
export type TRefreshTokenSchema = z.infer<typeof refreshTokenSchema>;
