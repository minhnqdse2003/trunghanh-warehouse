import { z } from 'zod'

export const LoginSchema = z.object({
  username: z
    .string()
    .min(1, 'Vui lòng nhập tên tài khoản!')
    .max(50, 'Username must be less than 50 characters'),
  password: z
    .string()
    .min(1, 'Vui lòng nhập mật khẩu!')
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      'Mật khẩu chứa ít nhất một số, và ký tự đặc biệt',
    ),
})
