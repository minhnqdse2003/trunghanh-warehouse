export interface Customer {
  customerId: number
  customerName: string
  address: string
  phoneNumber: string
  email: string
  documentNumber: string
  isLoyal: boolean
  status: number
}

export const CustomerStatus: Record<TCustomerStatus, number> = {
  Active: 1,
  InActive: 2,
}

type TCustomerStatus = 'Active' | 'InActive'
