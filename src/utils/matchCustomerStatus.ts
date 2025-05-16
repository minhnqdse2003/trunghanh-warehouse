import { CustomerStatus } from '@/types/customer/customer.type.data'

export const matchCustomerStatus = (status: number) => {
  switch (status) {
    case CustomerStatus.Active:
      return 'Hoạt Động'
    case CustomerStatus.InActive:
      return 'Ngừng Hoạt Động'
    default:
      return 'Không xác định'
  }
}

export const matchCustomerStatusColor = (status: number) => {
  switch (status) {
    case CustomerStatus.Active:
      return 'status-active'
    case CustomerStatus.InActive:
      return 'status-inactive'
    default:
      return ''
  }
}

export const matchCustomerLoyalColor = (isLoyal: boolean) => {
  if (isLoyal) return 'status-primary'
  return 'status-secondary'
}
