import { apiClient } from '@/lib/interceptor'
import { CustomerControllerEndpoints } from '.'
import { buildQueryParams } from '@/utils/buildParams'
import type {
  TCustomerFilterParams,
  UpdateCustomerRequest,
} from '@/types/customer/customer.type.req'

export async function getCustomerList<TResponse>(
  params: TCustomerFilterParams,
) {
  return await apiClient<TResponse>(
    `/api${CustomerControllerEndpoints.base}?${buildQueryParams(params)}`,
  )
}

export interface IUpdateCustomer {
  data: UpdateCustomerRequest
  customerId: number
}
export async function updateCustomer({ customerId, data }: IUpdateCustomer) {
  return await apiClient(
    `/api${CustomerControllerEndpoints.base}/${customerId}`,
    { method: 'PUT', body: JSON.stringify(data) },
  )
}
