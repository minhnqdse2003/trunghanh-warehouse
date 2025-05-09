import CategoryRootPage from '@/pages/category'
import { ROLES } from '@/types/role'
import type { RoutesProps } from '../types'
import { Tag } from 'lucide-react'

export const categoryRoutes: RoutesProps = {
  key: 'category',
  label: 'Quản Lý Danh Mục',
  url: '/category',
  icon: <Tag />,
  element: <CategoryRootPage />,
  allowedRoles: [ROLES.ADMIN.value, ROLES.SALEADMIN.value],
}
