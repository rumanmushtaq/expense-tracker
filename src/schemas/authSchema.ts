import * as v from 'valibot';

export const LoginSchema = v.object({
  email: v.pipe(
    v.string(),
    v.check((val) => val.trim().length > 0, 'Email is required'),
    v.email('Enter a valid email address'),
  ),
  password: v.pipe(
    v.string(),
    v.minLength(6, 'Password must be at least 6 characters'),
  ),
});
export type LoginFormValues = v.InferInput<typeof LoginSchema>;

export const RegisterSchema = v.object({
  name: v.pipe(
    v.string(),
    v.check((val) => val.trim().length > 0, 'Full name is required'),
    v.maxLength(50, 'Max 50 characters'),
  ),
  email: v.pipe(
    v.string(),
    v.check((val) => val.trim().length > 0, 'Email is required'),
    v.email('Enter a valid email address'),
  ),
  password: v.pipe(
    v.string(),
    v.minLength(6, 'Minimum 6 characters'),
  ),
  confirmPassword: v.pipe(
    v.string(),
    v.minLength(1, 'Please confirm your password'),
  ),
});
export type RegisterFormValues = v.InferInput<typeof RegisterSchema>;

export const ForgotPasswordSchema = v.object({
  email: v.pipe(
    v.string(),
    v.transform((s) => s.trim().toLowerCase()),
    v.minLength(1, 'Email is required'),
    v.email('Enter a valid email address'),
  ),
});
export type ForgotPasswordFormValues = v.InferInput<typeof ForgotPasswordSchema>;

export const ResetPasswordSchema = v.object({
  password: v.pipe(v.string(), v.minLength(6, 'Minimum 6 characters')),
  confirmPassword: v.pipe(v.string(), v.minLength(1, 'Please confirm your password')),
});
export type ResetPasswordFormValues = v.InferInput<typeof ResetPasswordSchema>;
