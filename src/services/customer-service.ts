import { apiClient } from '@/lib/interceptor'
import { CustomerControllerEndpoints } from '.'
import { buildQueryParams } from '@/utils/buildParams'
import type { TCustomerFilterParams } from '@/types/customer/customer.type.req'

export async function getCustomerList<TResponse>(
  params: TCustomerFilterParams,
) {
  return await apiClient<TResponse>(
    `/api${CustomerControllerEndpoints.base}?${buildQueryParams(params)}`,
  )
}
