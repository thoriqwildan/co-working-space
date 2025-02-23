import { z } from 'zod';

// Login Schema
export const UserLoginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(3, 'Password minimal 3 karakter'),
});
export type UserLoginDto = z.infer<typeof UserLoginSchema>;

// Register Schema
export const UserRegisterSchema = z
  .object({
    name: z.string().min(1).max(100),
    email: z.string().email('Email tidak valid'),
    phone_number: z.string().min(1).max(20, 'Maksimal karakter adalah 20'),
    password: z.string().min(3, 'Password minimal 3 karakter'),
    confirm_password: z.string().min(3, 'Password minimal 3 karakter'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirm_password'],
        message: 'Password do not match',
      });
    }
  });
export type UserRegisterDto = z.infer<typeof UserRegisterSchema>;

// Reset Password Schema
export const ResetPasswordSchema = z
  .object({
    new_password: z.string().min(3, 'Password minimal 3 karakter'),
    confirm_new_password: z.string().min(3, 'Password minimal 3 karakter'),
  })
  .superRefine((data, ctx) => {
    if (data.new_password !== data.confirm_new_password) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirm_password'],
        message: 'Password do not match',
      });
    }
  });
export type ResetPasswordDto = z.infer<typeof ResetPasswordSchema>;

// Update Profile
export const UpdateProfileSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  phone_number: z.string().min(1).max(20).optional(),
});
export type UpdateProfileDto = z.infer<typeof UpdateProfileSchema>;
