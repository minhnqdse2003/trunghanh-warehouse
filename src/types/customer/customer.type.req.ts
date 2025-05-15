import type { z } from 'zod'
import type { customerFormSchema } from './customer.type.schema'
import type { BaseFilter } from '../base-filter.type.req'

export interface CreateCustomerRequest {
  customerName: string
  address: string
  phoneNumber: string
  email: string
  documentNumber: string
}

export interface CustomerParams {
  ShowInactive?: boolean
}

export type TCreateCustomerForm = z.infer<typeof customerFormSchema>
export type TCustomerFilterParams = BaseFilter<CustomerParams>
