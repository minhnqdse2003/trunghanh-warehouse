import { CustomerColumnsDefOptions } from '@/components/tables/customer.columns'
import { DataTable } from '@/components/tables/data-table'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAppQuery } from '@/hooks/use-app-query'
import { QUERY_KEYS } from '@/types/constants/query-keys'
import type { Customer } from '@/types/customer/customer.type.data'
import { type TCustomerFilterParams } from '@/types/customer/customer.type.req'
import type { TGetCustomerListResponse } from '@/types/customer/customer.type.res'
import { useCallback, useEffect, useState } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import CustomerListMobile from './components/CustomerListMobile'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Search } from 'lucide-react'
import { useAppTable } from '@/hooks/use-app-table'
import {
  getCustomerList,
  updateCustomer,
  type IUpdateCustomer,
} from '@/services/customer-service'
import { Input } from '@/components/ui/input'
import MobileCustomerFilterComponents from '@/components/MobileCustomerFilterComponents'
import { type TOnToggleProps } from '@/components/DropdownComponent'
import CustomerDetailsDialog from './components/CustomerDetailsDialog'
import CustomerActionCell from './components/CustomerActionCell'
import { useAppMutation } from '@/hooks/use-app-mutation'
import CustomerEditDialog from './components/CustomerEditDialog'

const CustomerListPage = () => {
  const [dialog, setDialog] = useState<Record<TOnToggleProps, boolean>>({
    edit: false,
    details: false,
    remove: false,
  })

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
    resetFilter,
  } = useAppTable<Customer, TCustomerFilterParams>()

  const isMobile = useIsMobile()

  const query = useAppQuery<TGetCustomerListResponse>({
    queryFn: async () =>
      await getCustomerList<TGetCustomerListResponse>(filterParams),
    queryKey: [QUERY_KEYS.CUSTOMER, QUERY_KEYS.GET, filterParams],
  })

  const updateCustomerMutation = useAppMutation<unknown, IUpdateCustomer>({
    mutationFn: request => updateCustomer(request),
    mutationKey: [QUERY_KEYS.CUSTOMER, QUERY_KEYS.UPDATE],
    options: {
      onSuccess: () => {
        onCloseDialog('edit')
      },
    },
  })

  const onMutateCustomerData = (data: IUpdateCustomer) => {
    updateCustomerMutation.mutate(data)
  }

  const onCloseDialog = (type: TOnToggleProps) => {
    handleDialogToggle(type)
    setSelectedRowData(null)
    setRowSelection({})
  }

  const handleOnFilterChange = useCallback(
    (key: keyof TCustomerFilterParams, value: unknown) => {
      setFilterParams(prev => ({ ...prev, [key]: value, pageIndex: 0 }))
    },
    [setFilterParams],
  )

  const handleDialogToggle = useCallback((type: TOnToggleProps) => {
    setDialog(prev => ({
      ...prev,
      edit: type === 'edit' ? !prev.edit : false,
      details: type === 'details' ? !prev.details : false,
      remove: type === 'remove' ? !prev.remove : false,
    }))
  }, [])

  useEffect(() => {
    setFilterParams(prev => ({
      ...prev,
      Search: debouncedSearchTerm,
      pageIndex: 0,
    }))
  }, [debouncedSearchTerm, setFilterParams])

  useEffect(() => {
    const isAnyDialogOpen = Object.values(dialog).some(value => value)
    if (isAnyDialogOpen) {
      setSelectedRowData(
        query.data?.items[Object.keys(rowSelection)[0] as unknown as number] ??
          null,
      )
    } else {
      setSelectedRowData(null)
    }
  }, [dialog, query.data?.items, rowSelection, setSelectedRowData])

  return (
    <>
      <Card
        className={`${isMobile ? 'rounded-none' : ''} ${!(selectedRowData && isMobile) ? 'translate-x-0' : 'size-0 [&>*]:hidden border-none p-0 translate-x-full'} transition-all duration-300 ease-in-out`}>
        <CardHeader className='justify-center'>
          <CardTitle>Danh sách khách hàng</CardTitle>
          {!isMobile && (
            <CardAction>
              <div className='flex relative gap-4'>
                <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input
                  placeholder='Tên, Địa chỉ, SĐT, Email...'
                  value={searchTerm}
                  onChange={e => handleSearch(e.target.value)}
                  className='pl-8 '
                />
                <MobileCustomerFilterComponents
                  resetFilter={resetFilter}
                  filterParams={filterParams}
                  onFilterChange={handleOnFilterChange}
                />
              </div>
            </CardAction>
          )}
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
              columns={[
                ...CustomerColumnsDefOptions.base,
                {
                  id: 'action',
                  cell: ({ row, table }) => (
                    <CustomerActionCell
                      row={row}
                      table={table}
                      onToggle={handleDialogToggle}
                    />
                  ),
                },
              ]}
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
      {/* Mobile dialog */}
      <div
        className={`w-full h-full bg-white shadow-lg transition-all duration-500 ease-linear${
          selectedRowData && isMobile
            ? 'w-full h-full translate-x-0'
            : 'size-0 invisible fixed top-0 left-0 -translate-x-full'
        }`}>
        {selectedRowData && isMobile && (
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

      {/* PC dialog details edits */}
      {selectedRowData && (
        <>
          <CustomerDetailsDialog
            customer={selectedRowData}
            isOpen={dialog.details}
            onClose={() => onCloseDialog('details')}
          />

          <CustomerEditDialog
            customer={selectedRowData}
            isOpen={dialog.edit}
            isLoading={updateCustomerMutation.isPending}
            onClose={() => onCloseDialog('edit')}
            onEdit={onMutateCustomerData}
          />
        </>
      )}
    </>
  )
}

export default CustomerListPage
