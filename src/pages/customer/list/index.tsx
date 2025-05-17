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
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

const CustomerListPage = () => {
  const [customerFilterParams, setCustomerFilterParams] =
    useState<TCustomerFilterParams>({
      pageIndex: 0,
      pageSize: 10,
      Search: '',
    })
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  )
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
    <>
      <Card
        className={`${isMobile ? 'rounded-none' : ''} ${!selectedCustomer ? 'translate-x-0' : 'size-0 [&>*]:hidden border-none p-0 translate-x-full'} transition-all duration-300 ease-in-out`}>
        <CardHeader>
          <CardTitle>Danh sách khách hàng</CardTitle>
        </CardHeader>
        <CardContent>
          {isMobile ? (
            <CustomerListMobile
              filterParams={customerFilterParams}
              setFilterParams={setCustomerFilterParams}
              handlePageChange={handlePageChange}
              searchValue={searchTerm}
              onSearchValueChange={handleSearch}
              setSelectedCustomer={setSelectedCustomer}
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
      <div
        className={`w-full h-full bg-white shadow-lg transition-all duration-500 ease-linear${
          selectedCustomer
            ? 'w-full h-full translate-x-0'
            : 'size-0 invisible fixed top-0 left-0 -translate-x-full'
        }`}>
        {selectedCustomer && (
          <div className='p-4'>
            <Button
              variant='link'
              onClick={() => setSelectedCustomer(null)}
              className='mb-4'>
              <ArrowLeft className='mr-2' /> Quay Lại
            </Button>
            <div className='text-gray-800'>
              {/* Replace JSON.stringify with formatted customer details */}
              <h2 className='text-xl font-bold mb-2'>
                {selectedCustomer.customerName}
              </h2>
              <p>Email: {selectedCustomer.email || 'N/A'}</p>
              <p>Phone: {selectedCustomer.phoneNumber || 'N/A'}</p>
              {/* Add more customer fields as needed */}
              <pre className='whitespace-break-spaces'>
                {JSON.stringify(selectedCustomer, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default CustomerListPage
