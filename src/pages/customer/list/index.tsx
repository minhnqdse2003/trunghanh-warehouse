import { CustomerColumnsDefOptions } from '@/components/tables/customer.columns'
import { DataTable } from '@/components/tables/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAppQuery } from '@/hooks/use-app-query'
import { apiClient } from '@/lib/interceptor'
import { CustomerControllerEndpoints } from '@/services'
import { QUERY_KEYS } from '@/types/constants/query-keys'
import type { Customer } from '@/types/customer/customer.type'
import type { TCustomerFilterParams } from '@/types/customer/customer.type.req'
import type { TGetCustomerListResponse } from '@/types/customer/customer.type.res'
import { useMemo, useState } from 'react'
import { buildQueryParams } from '@/utils/buildParams'

const CustomerListPage = () => {
  const [customerFilterParams, setCustomerFilterParams] =
    useState<TCustomerFilterParams>({
      pageIndex: 0,
      pageSize: 10,
      Search: '',
    })

  const defaultFallback = useMemo(() => [], [])

  const query = useAppQuery<TGetCustomerListResponse>({
    queryFn: async () =>
      await apiClient(
        `/api${CustomerControllerEndpoints.base}?${buildQueryParams(customerFilterParams)}`,
      ),
    queryKey: [QUERY_KEYS.CUSTOMER, QUERY_KEYS.GET, customerFilterParams],
  })

  return (
    <Card className='rounded-none'>
      <CardHeader>
        <CardTitle>Danh sách khách hàng</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable<Customer, Customer, TCustomerFilterParams>
          data={query.data?.items ?? defaultFallback}
          columns={CustomerColumnsDefOptions.base}
          loading={query.isLoading}
          filter={{
            params: customerFilterParams,
            rowCount: query.data?.totalCount ?? -1,
            setPagination: setCustomerFilterParams,
          }}
        />
      </CardContent>
    </Card>
  )
}

export default CustomerListPage
