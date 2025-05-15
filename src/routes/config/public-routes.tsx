import SignInPage from '@/pages/auth'
import NotFound from '@/NotFound'
import Forbidden from '@/Forbidden'
import type { RoutesProps } from '../types'

export const publicRoutes: RoutesProps[] = [
  {
    key: 'sign-in',
    label: 'Đăng nhập',
    url: 'sign-in',
    hidden: true,
    element: <SignInPage />,
  },
  {
    key: 'not-found',
    label: 'Không tìm thấy',
    url: '404',
    hidden: true,
    element: <NotFound />,
  },
  {
    key: 'forbidden',
    label: 'Không có quyền',
    url: '403',
    hidden: true,
    element: <Forbidden />,
  },
  {
    key: 'internal-server-error',
    label: 'Server tạm dừng hoạt động',
    url: '500',
    hidden: true,
    element: <></>,
  },
]
