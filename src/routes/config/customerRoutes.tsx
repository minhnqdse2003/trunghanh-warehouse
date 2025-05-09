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
    ROLES.SALEADMIN.value,
    ROLES.ACCOUNTANT.value,
    ROLES.DIRECTOR.value,
    ROLES.INVENTORYMANAGER.value,
  ],
  children: [
    {
      key: 'customer-list',
      label: 'Danh sách khách hàng',
      url: '/customer/list',
      element: <CustomerListPage />,
      allowedRoles: [
        ROLES.SALEADMIN.value,
        ROLES.ACCOUNTANT.value,
        ROLES.DIRECTOR.value,
        ROLES.INVENTORYMANAGER.value,
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
        ROLES.SALEADMIN.value,
        ROLES.ACCOUNTANT.value,
        ROLES.DIRECTOR.value,
        ROLES.INVENTORYMANAGER.value,
      ],
    },
    {
      key: 'customer-create',
      label: 'Tạo khách hàng mới',
      url: '/customer/create', // Corrected from "list" to "create" for clarity
      element: <CreateCustomerPage />,
      allowedRoles: [ROLES.SALEADMIN.value],
    },
  ],
}
