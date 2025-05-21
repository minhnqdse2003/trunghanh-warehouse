import type { z } from 'zod'
import type {
  createCustomerFormSchema,
  updateCustomerFormSchema,
} from './customer.type.schema'
import type { BaseFilter } from '../base-filter.type.req'

export interface CreateCustomerRequest {
  customerName: string
  address: string
  phoneNumber: string
  email: string
  documentNumber: string
}

export interface UpdateCustomerRequest {
  customerName?: string
  address?: string
  phoneNumber?: string
  email?: string
  documentNumber?: string
  status?: string
}

export interface CustomerParams {
  ShowInactive?: boolean
}

export type TCreateCustomerForm = z.infer<typeof createCustomerFormSchema>
export type TCustomerFilterParams = BaseFilter<CustomerParams>
export type TUpdateCustomerForm = z.infer<typeof updateCustomerFormSchema>
