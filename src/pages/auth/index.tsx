import { useState } from 'react'
import Logo from '@/assets/logo.svg?react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useForm } from 'react-hook-form'
import { LoginSchema } from '@/types/auth/auth.type.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
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
import { AccountControllerEndpoints } from '@/services'
import type { TLogin } from '@/types/auth/auth.type.req'
import { toast } from 'sonner'
import { joinZodMessage } from '@/utils/matchError'
import { Eye, EyeOff } from 'lucide-react'
import type { AuthenticateInformationResponse } from '@/types/auth/auth.type.res'
import { QUERY_KEYS } from '@/types/constants/query-keys'
import useAuth from '@/hooks/use-auth'
import { Navigate } from 'react-router-dom'

const SignInPage = () => {
  const [isToggleViewPassword, setIsToggleViewPassword] = useState(false)
  const { onUserSignIn, isAuthenticated } = useAuth()

  const form = useForm<TLogin>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = (values: TLogin) => {
    const validatedLoginData = LoginSchema.safeParse(values)
    if (validatedLoginData.success) {
      mutation.mutate(values)
    } else {
      const messages = joinZodMessage(validatedLoginData.error)
      toast.error('Sai thông tin đăng nhập', {
        description: messages,
        duration: 3000,
      })
    }
  }

  const togglePasswordView = () => {
    setIsToggleViewPassword(prev => !prev)
  }

  const mutation = useAppMutation<AuthenticateInformationResponse, TLogin>({
    mutationFn: variables =>
      apiClient(`/api${AccountControllerEndpoints.login}`, {
        method: 'POST',
        body: JSON.stringify(variables),
      }),
    mutationKey: [QUERY_KEYS.LOGIN],
    options: {
      onSuccess: data => onUserSignIn(data),
    },
  })

  if (isAuthenticated) {
    return <Navigate to={'/'} replace />
  }

  return (
    <div className='w-svw h-svh flex justify-center items-center'>
      <Card className='w-full h-full flex justify-center md:w-1/2 md:h-fit'>
        <CardHeader className='justify-center text-center '>
          <Logo className='w-full' />
          <CardTitle className='truncate'>Chào Mừng Quay Trở Lại</CardTitle>
          <CardDescription className='truncate'>
            Đăng nhập vào hệ thống để tiến hành quản lý kho
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên đăng nhập</FormLabel>
                    <FormControl>
                      <Input placeholder='Vui lòng nhập tài khoản' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          placeholder='Vui lòng nhập mật khẩu...'
                          type={isToggleViewPassword ? 'text' : 'password'}
                          {...field}
                        />
                        {isToggleViewPassword ? (
                          <Eye
                            size={18}
                            className='absolute transform -translate-x-1/2 -translate-y-1/2 top-[calc(var(--spacing)*9/2)] right-2 z-10 cursor-pointer text-gray-500'
                            onClick={togglePasswordView}
                          />
                        ) : (
                          <EyeOff
                            size={18}
                            className='absolute transform -translate-x-1/2 -translate-y-1/2 top-[calc(var(--spacing)*9/2)] right-2 z-10 cursor-pointer text-gray-500'
                            onClick={togglePasswordView}
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className='w-full hover:cursor-pointer'
                loading={mutation.isPending}
                type='submit'>
                Đăng nhập
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignInPage
