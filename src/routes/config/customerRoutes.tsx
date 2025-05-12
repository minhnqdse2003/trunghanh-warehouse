import CustomerRootPage from '@/pages/customer'
import CreateCustomerPage from '@/pages/customer/create'
import CustomerListPage from '@/pages/customer/list'
import { ROLES } from '@/types/role'
import type { RoutesProps } from '../types'
import { BookUser } from 'lucide-react'

export const customerRoutes: RoutesProps = {
  key: 'customer',
  label: 'Khách Hàng',
  url: '/customer',
  icon: <BookUser />,
  element: <CustomerRootPage />,
  allowedRoles: [
    ROLES.SALES_ADMIN,
    ROLES.ACCOUNTANT,
    ROLES.DIRECTOR,
    ROLES.INVENTORY_MANAGER,
  ],
  children: [
    {
      key: 'customer-list',
      label: 'Danh sách khách hàng',
      url: '/customer/list',
      element: <CustomerListPage />,
      allowedRoles: [
        ROLES.SALES_ADMIN,
        ROLES.ACCOUNTANT,
        ROLES.DIRECTOR,
        ROLES.INVENTORY_MANAGER,
      ],
    },
    {
      key: 'customer-index',
      label: 'Danh sách khách hàng',
      url: '/customer/list',
      hidden: true,
      index: true,
      element: <CustomerListPage />,
      allowedRoles: [
        ROLES.SALES_ADMIN,
        ROLES.ACCOUNTANT,
        ROLES.DIRECTOR,
        ROLES.INVENTORY_MANAGER,
      ],
    },
    {
      key: 'customer-create',
      label: 'Tạo khách hàng mới',
      url: '/customer/create', // Corrected from "list" to "create" for clarity
      element: <CreateCustomerPage />,
      allowedRoles: [ROLES.SALES_ADMIN],
    },
  ],
}
