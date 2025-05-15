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
import { useIsMobile } from '@/hooks/use-mobile'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const CustomerListPage = () => {
  const [customerFilterParams, setCustomerFilterParams] =
    useState<TCustomerFilterParams>({
      pageIndex: 0,
      pageSize: 10,
      Search: '',
    })
  const isMobile = useIsMobile()

  const defaultFallback = useMemo(() => [], [])

  const query = useAppQuery<TGetCustomerListResponse>({
    queryFn: async () =>
      await apiClient(
        `/api${CustomerControllerEndpoints.base}?${buildQueryParams(customerFilterParams)}`,
      ),
    queryKey: [QUERY_KEYS.CUSTOMER, QUERY_KEYS.GET, customerFilterParams],
  })

  // Handle search input
  const handleSearch = (value: string) => {
    setCustomerFilterParams(prev => ({
      ...prev,
      Search: value,
      pageIndex: 0, // Reset to first page on search
    }))
  }

  // Handle pagination
  const handlePageChange = (direction: 'next' | 'prev') => {
    setCustomerFilterParams(prev => ({
      ...prev,
      pageIndex:
        direction === 'next'
          ? prev.pageIndex + 1
          : Math.max(0, prev.pageIndex - 1),
    }))
  }

  // Calculate if next/prev buttons should be disabled
  const totalPages = Math.ceil(
    (query.data?.totalCount ?? 0) / customerFilterParams.pageSize,
  )
  const isPrevDisabled = customerFilterParams.pageIndex === 0
  const isNextDisabled = customerFilterParams.pageIndex >= totalPages - 1

  // Mobile Customer Card Component
  const MobileCustomerCard = ({ customer }: { customer: Customer }) => {
    return (
      <Card className='mb-4 p-4'>
        <div className='flex justify-between items-start'>
          <div>
            <h3 className='text-lg font-semibold'>{customer.customerName}</h3>
            <p className='text-sm text-muted-foreground'>
              ID: {customer.customerId}
            </p>
          </div>
          <Badge variant={customer.isLoyal ? 'default' : 'secondary'}>
            {customer.isLoyal ? 'Loyal' : 'Standard'}
          </Badge>
        </div>
        <Separator className='my-2' />
        <div className='space-y-2 text-sm'>
          <p>
            <span className='font-medium'>Email:</span> {customer.email}
          </p>
          <p>
            <span className='font-medium'>Phone:</span> {customer.phoneNumber}
          </p>
          <p>
            <span className='font-medium'>Address:</span> {customer.address}
          </p>
          <p>
            <span className='font-medium'>Document:</span>{' '}
            {customer.documentNumber}
          </p>
          <p>
            <span className='font-medium'>Status:</span>{' '}
            <Badge variant={customer.status === 1 ? 'default' : 'destructive'}>
              {customer.status === 1 ? 'Active' : 'Inactive'}
            </Badge>
          </p>
        </div>
      </Card>
    )
  }

  // Loading Skeleton for Mobile
  const MobileCustomerSkeleton = () => (
    <Card className='mb-4 p-4'>
      <Skeleton className='h-6 w-3/4 mb-2' />
      <Skeleton className='h-4 w-1/4 mb-2' />
      <Separator className='my-2' />
      <Skeleton className='h-4 w-full mb-1' />
      <Skeleton className='h-4 w-full mb-1' />
      <Skeleton className='h-4 w-full mb-1' />
      <Skeleton className='h-4 w-1/2' />
    </Card>
  )

  return (
    <Card className={isMobile ? 'rounded-none' : ''}>
      <CardHeader>
        <CardTitle>Danh sách khách hàng</CardTitle>
      </CardHeader>
      <CardContent>
        {isMobile ? (
          <div className='space-y-4'>
            {/* Search Input */}
            <div className='relative'>
              <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Tìm kiếm khách hàng...'
                value={customerFilterParams.Search}
                onChange={e => handleSearch(e.target.value)}
                className='pl-8'
              />
            </div>
            {/* Customer List */}
            {query.isLoading ? (
              <>
                <MobileCustomerSkeleton />
                <MobileCustomerSkeleton />
                <MobileCustomerSkeleton />
              </>
            ) : query.data?.items.length ? (
              query.data.items.map(customer => (
                <MobileCustomerCard
                  key={customer.customerId}
                  customer={customer}
                />
              ))
            ) : (
              <p className='text-center text-muted-foreground'>
                Không tìm thấy khách hàng.
              </p>
            )}

            {/* Pagination */}
            {query.data?.items.length ? (
              <div className='flex justify-between items-center mt-4'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => handlePageChange('prev')}
                  disabled={isPrevDisabled}>
                  <ChevronLeft className='h-4 w-4 mr-2' />
                  Trước
                </Button>
                <span className='text-sm'>
                  Trang {customerFilterParams.pageIndex + 1} / {totalPages}
                </span>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => handlePageChange('next')}
                  disabled={isNextDisabled}>
                  Sau
                  <ChevronRight className='h-4 w-4 ml-2' />
                </Button>
              </div>
            ) : null}
          </div>
        ) : (
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
        )}
      </CardContent>
    </Card>
  )
}

export default CustomerListPage
