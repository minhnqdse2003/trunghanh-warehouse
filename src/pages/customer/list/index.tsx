import { CustomerColumnsDefOptions } from '@/components/tables/customer.columns'
import { DataTable } from '@/components/tables/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAppQuery } from '@/hooks/use-app-query'
import { apiClient } from '@/lib/interceptor'
import { CustomerControllerEndpoints } from '@/services'
import { QUERY_KEYS } from '@/types/constants/query-keys'
import type { Customer } from '@/types/customer/customer.type.data'
import type { TCustomerFilterParams } from '@/types/customer/customer.type.req'
import type { TGetCustomerListResponse } from '@/types/customer/customer.type.res'
import { useCallback, useEffect, useState } from 'react'
import { buildQueryParams } from '@/utils/buildParams'
import { useIsMobile } from '@/hooks/use-mobile'
import { useDebounce } from '@uidotdev/usehooks'
import CustomerListMobile from './components/CustomerListMobile'

const CustomerListPage = () => {
  const [customerFilterParams, setCustomerFilterParams] =
    useState<TCustomerFilterParams>({
      pageIndex: 0,
      pageSize: 10,
      Search: '',
    })
  const [searchTerm, setSearchTerm] = useState('')
  const isMobile = useIsMobile()
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const query = useAppQuery<TGetCustomerListResponse>({
    queryFn: async () =>
      await apiClient(
        `/api${CustomerControllerEndpoints.base}?${buildQueryParams(customerFilterParams)}`,
      ),
    queryKey: [QUERY_KEYS.CUSTOMER, QUERY_KEYS.GET, customerFilterParams],
  })

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value)
  }, [])

  const handlePageChange = useCallback((direction: 'next' | 'prev') => {
    setCustomerFilterParams(prev => ({
      ...prev,
      pageIndex:
        direction === 'next'
          ? prev.pageIndex + 1
          : Math.max(0, prev.pageIndex - 1),
    }))
  }, [])

  useEffect(() => {
    setCustomerFilterParams(prev => ({
      ...prev,
      Search: debouncedSearchTerm,
      pageIndex: 0,
    }))
  }, [debouncedSearchTerm])

  return (
    <Card className={isMobile ? 'rounded-none' : ''}>
      <CardHeader>
        <CardTitle>Danh sách khách hàng</CardTitle>
      </CardHeader>
      <CardContent>
        {isMobile ? (
          <CustomerListMobile
            filterParams={customerFilterParams}
            handlePageChange={handlePageChange}
            searchValue={searchTerm}
            onSearchValueChange={handleSearch}
            query={query}
          />
        ) : (
          <DataTable<
            Customer,
            Customer,
            TCustomerFilterParams,
            TGetCustomerListResponse
          >
            query={query}
            columns={CustomerColumnsDefOptions.base}
            filter={{
              params: customerFilterParams,
              rowCount: query.data?.totalCount ?? -1,
              setPagination: setCustomerFilterParams,
            }}
          />
        )}
      </CardContent>
    </Card>
  )
}

export default CustomerListPage
