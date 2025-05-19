import { CustomerColumnsDefOptions } from '@/components/tables/customer.columns'
import { DataTable } from '@/components/tables/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAppQuery } from '@/hooks/use-app-query'
import { QUERY_KEYS } from '@/types/constants/query-keys'
import type { Customer } from '@/types/customer/customer.type.data'
import type { TCustomerFilterParams } from '@/types/customer/customer.type.req'
import type { TGetCustomerListResponse } from '@/types/customer/customer.type.res'
import { useEffect } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import CustomerListMobile from './components/CustomerListMobile'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useAppTable } from '@/hooks/use-app-table'
import { getCustomerList } from '@/services/customer-service'

const CustomerListPage = () => {
  const {
    filterParams,
    setFilterParams,
    handleSearch,
    handlePageChange,
    debouncedSearchTerm,
    searchTerm,
    setSelectedRowData,
    selectedRowData,
    rowSelection,
    setRowSelection,
  } = useAppTable<Customer, TCustomerFilterParams>()
  const isMobile = useIsMobile()

  const query = useAppQuery<TGetCustomerListResponse>({
    queryFn: async () =>
      await getCustomerList<TGetCustomerListResponse>(filterParams),
    queryKey: [QUERY_KEYS.CUSTOMER, QUERY_KEYS.GET, filterParams],
  })

  useEffect(() => {
    setFilterParams(prev => ({
      ...prev,
      Search: debouncedSearchTerm,
      pageIndex: 0,
    }))
  }, [debouncedSearchTerm, setFilterParams])

  return (
    <>
      <Card
        className={`${isMobile ? 'rounded-none' : ''} ${!selectedRowData ? 'translate-x-0' : 'size-0 [&>*]:hidden border-none p-0 translate-x-full'} transition-all duration-300 ease-in-out`}>
        <CardHeader>
          <CardTitle>Danh sách khách hàng</CardTitle>
        </CardHeader>
        <CardContent>
          {isMobile ? (
            <CustomerListMobile
              filterParams={filterParams}
              setFilterParams={setFilterParams}
              handlePageChange={handlePageChange}
              searchValue={searchTerm}
              onSearchValueChange={handleSearch}
              setSelectedCustomer={setSelectedRowData}
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
                params: filterParams,
                rowCount: query.data?.totalCount ?? -1,
                setPagination: setFilterParams,
              }}
              rowSelectionState={{
                rowSelections: rowSelection,
                onRowSelectionChange: setRowSelection,
              }}
            />
          )}
        </CardContent>
      </Card>
      <div
        className={`w-full h-full bg-white shadow-lg transition-all duration-500 ease-linear${
          selectedRowData
            ? 'w-full h-full translate-x-0'
            : 'size-0 invisible fixed top-0 left-0 -translate-x-full'
        }`}>
        {selectedRowData && (
          <div className='p-4'>
            <Button
              variant='link'
              onClick={() => setSelectedRowData(null)}
              className='mb-4'>
              <ArrowLeft className='mr-2' /> Quay Lại
            </Button>
            <div className='text-gray-800'>
              {/* Replace JSON.stringify with formatted customer details */}
              <h2 className='text-xl font-bold mb-2'>
                {selectedRowData.customerName}
              </h2>
              <p>Email: {selectedRowData.email || 'N/A'}</p>
              <p>Phone: {selectedRowData.phoneNumber || 'N/A'}</p>
              {/* Add more customer fields as needed */}
              <pre className='whitespace-break-spaces'>
                {JSON.stringify(selectedRowData, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default CustomerListPage
