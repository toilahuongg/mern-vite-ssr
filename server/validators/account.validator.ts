import { z } from 'zod';

export const signUpValidator = z.object({
  body: z
    .object({
      username: z
        .string({ required_error: 'Username is required', invalid_type_error: 'Username must be a string' })
        .min(5, { message: 'Username must be 5 or more characters long' })
        .max(32, { message: 'Username must be 32 or fewer characters long' }),
      email: z
        .string({ required_error: 'Email is required', invalid_type_error: 'Username must be a string' })
        .email({ message: 'Invalid email address' }),
      password: z
        .string({ required_error: 'Password is required' })
        .min(6, { message: 'Password must be 6 or more characters long' }),
      confirmPassword: z.string({ required_error: 'Confirm password is required' }),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
      message: "Passwords don't match",
    }),
});

export const loginValidator = z.object({
  body: z.object({
    account: z.string({
      required_error: 'Username or email is required',
      invalid_type_error: 'Username or email must be a string',
    }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

export const changePasswordValidator = z.object({
  body: z
    .object({
      oldPassword: z.string({
        required_error: 'Old password is required',
        invalid_type_error: 'Old password must be a string',
      }),
      newPassword: z
        .string({ required_error: 'New password is required' })
        .min(6, { message: 'New password must be 6 or more characters long' }),
      confirmPassword: z.string({ required_error: 'Confirm password is required' }),
    })
    .refine(({ newPassword, confirmPassword }) => newPassword === confirmPassword, {
      message: "Passwords don't match",
    }),
});

export const changeInformationValidator = z.object({
  body: z.object({
    firstName: z
      .string({
        invalid_type_error: 'First name must be a string',
      })
      .optional(),
    lastName: z
      .string({
        invalid_type_error: 'Last name must be a string',
      })
      .optional(),
    phoneNumber: z
      .string({
        invalid_type_error: 'Phone number must be a string',
      })
      .optional(),
    address: z
      .string({
        invalid_type_error: 'Address must be a string',
      })
      .optional(),
  }),
});
