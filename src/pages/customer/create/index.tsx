import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAppMutation } from '@/hooks/use-app-mutation'
import { apiClient } from '@/lib/interceptor'
import { CustomerControllerEndpoints } from '@/services'
import { QUERY_KEYS } from '@/types/constants/query-keys'
import type { TCreateCustomerForm } from '@/types/customer/customer.type.req'
import { customerFormSchema } from '@/types/customer/customer.type.schema'
import { joinZodMessage } from '@/utils/matchError'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const CreateCustomerPage = () => {
  const form = useForm<TCreateCustomerForm>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      customerName: '',
      address: '',
      documentNumber: '',
      email: '',
      phoneNumber: '',
    },
  })

  const mutation = useAppMutation<TCreateCustomerForm>({
    mutationFn: data =>
      apiClient<TCreateCustomerForm>(
        `/api${CustomerControllerEndpoints.base}`,
        {
          method: 'POST',
          body: JSON.stringify(data),
        },
      ),
    mutationKey: [QUERY_KEYS.CUSTOMER, QUERY_KEYS.CREATE],
  })

  const onSubmit = (values: TCreateCustomerForm) => {
    const validatedCustomerFormData = customerFormSchema.safeParse(values)
    const { data } = validatedCustomerFormData
    if (data) {
      console.log(data)
      mutation.mutate(data, {
        onSuccess: () => {
          toast.success('Tạo khách hàng mới thành công')
          form.reset()
        },
      })
      return
    }
    const messages = joinZodMessage(validatedCustomerFormData.error)
    toast.error('Sai Thông Tin', {
      description: messages,
      duration: 3000,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thêm khách hàng mới</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='customerName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên Khách Hàng</FormLabel>
                  <FormControl>
                    <Input placeholder='Nguyễn Văn A' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Địa Chỉ</FormLabel>
                  <FormControl>
                    <Input placeholder='123 Đường Láng, Hà Nội' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phoneNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số Điện Thoại</FormLabel>
                  <FormControl>
                    <Input placeholder='+84912345678' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='nguyenvana@example.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='documentNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số Tài Liệu</FormLabel>
                  <FormControl>
                    <Input placeholder='CMND12345678' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full'>
              Gửi
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default CreateCustomerPage
