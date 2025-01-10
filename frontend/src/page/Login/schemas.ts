import * as zod from 'zod';

export const LoginSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Invalid email address.' }),
  password: zod
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' })
    .max(20, { message: 'Password must be at most 20 characters.' }),
});

export type LoginSchemaType = zod.infer<typeof LoginSchema>;
