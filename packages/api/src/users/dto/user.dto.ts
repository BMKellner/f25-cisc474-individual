import { z } from 'zod';

export const UserOut = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string().email().nullable(),
  emailVerified: z.date().nullable(),
  createdAt: z.date(),
});

export type UserOut = z.infer<typeof UserOut>;

export const UserCreateIn = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Valid email is required'),
  emailVerified: z.boolean().optional(),
});

export type UserCreateIn = z.infer<typeof UserCreateIn>;

export const UserUpdateIn = z.object({
  name: z.string().min(1).max(100).optional(),
  email: z.string().email().optional(),
  emailVerified: z.boolean().optional(),
});

export type UserUpdateIn = z.infer<typeof UserUpdateIn>;
