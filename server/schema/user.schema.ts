import { object, z } from 'zod';

export const userSchema = object({
  username: z.string(),
  password: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
});

export type TUser = z.infer<typeof userSchema>;
