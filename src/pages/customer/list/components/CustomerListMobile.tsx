import EmailLink from '@/components/EmailLink'
import { LoadingSpinner } from '@/components/LoadingSpiner'
import MobileCustomerFilterComponents from '@/components/MobileCustomerFilterComponents'
import PhoneNumberLink from '@/components/PhoneNumberLink'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { usePagination } from '@/hooks/use-pagination'
import type { Customer } from '@/types/customer/customer.type.data'
import type { TCustomerFilterParams } from '@/types/customer/customer.type.req'
import type { TGetCustomerListResponse } from '@/types/customer/customer.type.res'
import {
  matchCustomerLoyalColor,
  matchCustomerStatus,
  matchCustomerStatusColor,
} from '@/utils/matchCustomerStatus'
import { matchQueryStatus } from '@/utils/matchQueryStatus'
import type { UseQueryResult } from '@tanstack/react-query'
import { ChevronLeft, ChevronRight, Dot, Search } from 'lucide-react'
import { useCallback } from 'react'

interface ICustomerListMobile {
  filterParams: TCustomerFilterParams
  setFilterParams: React.Dispatch<React.SetStateAction<TCustomerFilterParams>>
  searchValue: string
  onSearchValueChange: (value: string) => void
  query: UseQueryResult<TGetCustomerListResponse, Error>
  handlePageChange: (direction: 'next' | 'prev') => void
  setSelectedCustomer: React.Dispatch<React.SetStateAction<Customer | null>>
}

const CustomerListMobile = ({
  filterParams,
  onSearchValueChange,
  searchValue,
  query,
  handlePageChange,
  setFilterParams,
  setSelectedCustomer,
}: ICustomerListMobile) => {
  const { isNextDisabled, isPrevDisabled, totalPages } = usePagination({
    pageIndex: filterParams.pageIndex,
    pageSize: filterParams.pageSize,
    totalCount: query.data?.totalCount,
  })

  const handleOnFilterChange = useCallback(
    (key: keyof TCustomerFilterParams, value: unknown) => {
      setFilterParams(prev => ({ ...prev, [key]: value, pageIndex: 0 }))
    },
    [setFilterParams],
  )

  const resetFilter = useCallback(() => {
    setFilterParams({ pageIndex: 0, pageSize: 10, Search: '' })
  }, [])

  return (
    <div className='space-y-4'>
      {/* Search Input */}
      <div className='flex relative gap-4'>
        <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
        <Input
          placeholder='Tìm kiếm khách hàng...'
          value={searchValue}
          onChange={e => onSearchValueChange(e.target.value)}
          className='pl-8 grow'
        />
        <MobileCustomerFilterComponents
          resetFilter={resetFilter}
          filterParams={filterParams}
          onFilterChange={handleOnFilterChange}
        />
      </div>
      {/* Customer List */}
      {matchQueryStatus<Customer, TGetCustomerListResponse>(query, {
        Loading: <LoadingSpinner className='mx-auto my-8' />,
        Empty: (
          <p className='mx-auto my-8 text-center'>Hiện không có dữ liệu</p>
        ),
        Success: query.data?.items.map((customer, idx) => (
          <Card
            key={customer.customerId + idx}
            onClick={() => setSelectedCustomer(customer)}
            className='w-full flex justify-between border-b-1 px-4 hover:bg-sidebar-accent-foreground transition-[background-color] duration-300'>
            <div className='flex flex-row justify-between items-center'>
              <div className='flex flex-col gap-4'>
                <p className='flex gap-2 font-medium flex-wrap'>
                  <span className='flex-grow basis-auto'>
                    {customer.customerName}
                  </span>
                  <PhoneNumberLink
                    className='basis-auto'
                    phoneNumber={customer.phoneNumber}
                  />
                  <EmailLink email={customer.email} className='basis-auto' />
                </p>
                <p className='font-medium'>
                  Mã tài liệu:{' '}
                  <span className='text-sm font-normal'>
                    {customer.documentNumber}
                  </span>
                </p>
                <p className='font-medium'>
                  Địa chỉ:{' '}
                  <span className='text-sm font-normal'>
                    {customer.address}
                  </span>
                </p>
              </div>
              <ChevronRight />
            </div>
            <div>
              <Separator className='mb-4' />
              <div className='flex gap-4 flex-wrap'>
                <p className='text-xs font-medium flex-grow flex-shrink-0 basis-auto'>
                  <Badge
                    className={
                      matchCustomerStatusColor(customer.status) + ' ' + 'w-full'
                    }>
                    <Dot className='animate-ping' />
                    {matchCustomerStatus(customer.status)}
                  </Badge>
                </p>
                <p className='text-xs font-medium flex-grow flex-shrink-0 basis-auto'>
                  <Badge
                    className={
                      matchCustomerLoyalColor(customer.isLoyal) + ' ' + 'w-full'
                    }>
                    <Dot className='animate-ping' />
                    {customer.isLoyal
                      ? 'Khách hàng thân thiết'
                      : 'Khách hàng thường'}
                  </Badge>
                </p>
              </div>
            </div>
          </Card>
        )),
      })}
      {/* Pagination */}
      {query.data && query.data.items.length > 0 && (
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
            Trang {filterParams.pageIndex + 1} / {totalPages}
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
      )}
    </div>
  )
}

export default CustomerListMobile
