import { z } from 'zod'

export const customerFormSchema = z.object({
  customerName: z.string().min(2, {
    message: 'Tên khách hàng phải có ít nhất 2 ký tự.',
  }),
  address: z.string().min(5, {
    message: 'Địa chỉ phải có ít nhất 5 ký tự.',
  }),
  phoneNumber: z.string().regex(/^\+?[\d\s-]{10,}$/, {
    message: 'Vui lòng nhập số điện thoại hợp lệ.',
  }),
  email: z.string().email({
    message: 'Vui lòng nhập địa chỉ email hợp lệ.',
  }),
  documentNumber: z.string().min(8, {
    message: 'Số tài liệu phải có ít nhất 8 ký tự.',
  }),
})
