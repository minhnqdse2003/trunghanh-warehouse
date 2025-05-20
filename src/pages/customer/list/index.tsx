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
import type { TCustomerFilterParams } from '@/types/customer/customer.type.req'
import type { TGetCustomerListResponse } from '@/types/customer/customer.type.res'
import { useCallback, useEffect, useState } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import CustomerListMobile from './components/CustomerListMobile'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Dot, Locate, Mail, PhoneCall, Search } from 'lucide-react'
import { useAppTable } from '@/hooks/use-app-table'
import { getCustomerList } from '@/services/customer-service'
import { Input } from '@/components/ui/input'
import MobileCustomerFilterComponents from '@/components/MobileCustomerFilterComponents'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import DropdownComponent, {
  type TOnToggleProps,
} from '@/components/DropdownComponent'
import { ALLOWED_ALL_ACCESS, ROLES } from '@/types/role'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { matchCustomerLoyalColor } from '@/utils/matchCustomerStatus'
import EmailLink from '@/components/EmailLink'

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
    resetFilter,
  } = useAppTable<Customer, TCustomerFilterParams>()

  const isMobile = useIsMobile()

  const query = useAppQuery<TGetCustomerListResponse>({
    queryFn: async () =>
      await getCustomerList<TGetCustomerListResponse>(filterParams),
    queryKey: [QUERY_KEYS.CUSTOMER, QUERY_KEYS.GET, filterParams],
  })

  const [dialog, setDialog] = useState<Record<TOnToggleProps, boolean>>({
    edit: false,
    details: false,
    remove: false,
  })

  const handleOnFilterChange = useCallback(
    (key: keyof TCustomerFilterParams, value: unknown) => {
      setFilterParams(prev => ({ ...prev, [key]: value, pageIndex: 0 }))
    },
    [setFilterParams],
  )

  useEffect(() => {
    setFilterParams(prev => ({
      ...prev,
      Search: debouncedSearchTerm,
      pageIndex: 0,
    }))
  }, [debouncedSearchTerm, setFilterParams])

  useEffect(() => {
    const value: boolean[] = Object.keys(dialog).map(
      key => dialog[key as keyof typeof dialog],
    )
    if (value.some(existTrueValue => existTrueValue)) {
      setSelectedRowData(
        query.data?.items[Object.keys(rowSelection)[0] as unknown as number] ??
          null,
      )
    } else {
      setSelectedRowData(null)
    }

    return () => setSelectedRowData(null)
  }, [
    dialog,
    dialog.details,
    dialog.edit,
    dialog.remove,
    query.data?.items,
    rowSelection,
    setSelectedRowData,
  ])

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
                  cell: ({ row, table }) => {
                    const onToggle = async (type: TOnToggleProps) => {
                      await removeAllToggleSelected()
                      row.toggleSelected()
                      updateDialogOpenStatus(type)
                    }
                    const removeAllToggleSelected = async () =>
                      table.toggleAllPageRowsSelected(false)

                    const updateDialogOpenStatus = async (
                      toggleType: TOnToggleProps,
                    ) => {
                      const newDialogState = Object.keys(dialog).reduce<
                        typeof dialog
                      >(
                        (acc, key) => ({
                          ...acc,
                          [key]: key === toggleType,
                        }),
                        dialog,
                      )
                      setDialog(newDialogState)
                    }

                    return (
                      <DropdownComponent
                        allowedRoles={{
                          edit: [ROLES.SALES_ADMIN, ROLES.ADMIN],
                          details: ALLOWED_ALL_ACCESS,
                          remove: [ROLES.ADMIN],
                        }}
                        onToggle={onToggle}
                      />
                    )
                  },
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
      {selectedRowData && dialog.details && (
        <Dialog
          defaultOpen={dialog.details}
          onOpenChange={open =>
            setDialog(prev => ({ ...prev, details: open }))
          }>
          <DialogContent className='min-w-2/5 fixed left-full translate-x-[-102%] h-[95vh] overflow-y-auto flex flex-col'>
            <DialogHeader>
              <DialogTitle>
                <span className='text-base font-semibold'>
                  {`Thông tin khách hàng - ${selectedRowData.customerName}`}{' '}
                  <Badge
                    className={matchCustomerLoyalColor(
                      selectedRowData.isLoyal,
                    )}>
                    <Dot className='animate-ping' />
                    {selectedRowData.isLoyal
                      ? 'Khách hàng thân thiết'
                      : 'Khách hàng thường'}
                  </Badge>
                </span>
              </DialogTitle>
            </DialogHeader>
            <div className='mt-4 space-y-4 basis-auto grow shrink-0'>
              <div className='flex items-center'>
                <Label className='text-gray-600 basis-1/4'>
                  <Mail /> <span>Email:</span>
                </Label>
                <span className='font-medium text-sm grow'>
                  <EmailLink email={selectedRowData.email} isMobile={false} />
                </span>
              </div>
              <Separator />
              <div className='flex items-center'>
                <Label className='text-gray-600 basis-1/4'>
                  <PhoneCall />
                  SĐT:
                </Label>
                <span className='font-medium text-sm grow'>
                  {selectedRowData.phoneNumber || 'N/A'}
                </span>
              </div>
              <Separator />
              <div className='flex items-start'>
                <Label className='text-gray-600 basis-1/4 shrink-0'>
                  <Locate />
                  Địa chỉ:
                </Label>
                <span className='font-medium text-sm'>
                  {selectedRowData.address || 'N/A'}
                </span>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant='outline'
                onClick={() =>
                  setDialog(prev => ({ ...prev, details: false }))
                }>
                Đóng
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

export default CustomerListPage
