import type { TCustomerFilterParams } from '@/types/customer/customer.type.req'
import { ArrowRightLeft, FilterIcon, X } from 'lucide-react'
import { useCallback } from 'react'
import { Button } from './ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import DateFromDateToPicker from './DateFromDateToPicker'
import { CustomerStatus } from '@/types/customer/customer.type.data'
import { matchCustomerStatus } from '@/utils/matchCustomerStatus'
import { Badge } from './ui/badge'

interface IMobileCustomerFilterComponents {
  filterParams: TCustomerFilterParams
  onFilterChange: (key: keyof TCustomerFilterParams, value: unknown) => void
  resetFilter: () => void
}

const MobileCustomerFilterComponents = ({
  filterParams,
  onFilterChange,
  resetFilter,
}: IMobileCustomerFilterComponents) => {
  const onDateChange = useCallback(
    (date: Date | undefined, type: keyof TCustomerFilterParams) => {
      onFilterChange(type, date)
    },
    [onFilterChange],
  )

  const getVariant = (
    showInactive: boolean | undefined,
    key: string,
  ): 'default' | 'outline' => {
    if (showInactive === undefined) return 'outline'
    return (showInactive && key === 'InActive') ||
      (!showInactive && key === 'Active')
      ? 'default'
      : 'outline'
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>
          <FilterIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent className='min-h-1/2 max-h-3/4 pb-8'>
        <DrawerHeader>
          <DrawerTitle className='text-base flex justify-between items-center'>
            Bộ lọc{' '}
            <Badge
              className='badge-destructive hover:cursor-pointer hover:bg-red-50'
              variant='outline'
              onClick={resetFilter}>
              <X /> Xóa bộ lọc
            </Badge>
          </DrawerTitle>
          <DrawerDescription className='text-xs'>
            Tìm kiếm theo thời gian, Trạng thái hoạt động
          </DrawerDescription>
        </DrawerHeader>
        <Accordion type='single' collapsible className='w-full px-4'>
          <AccordionItem value='item-1'>
            <AccordionTrigger className='text-xs'>
              <p className='flex flex-row justify-start items-end gap-4 [&>svg]:size-4 pb-4 w-full'>
                Từ Ngày <ArrowRightLeft /> Đến Ngày{' '}
                <span className='text-[0.625rem] text-gray-600'>
                  (Tháng/Ngày/Năm)
                </span>
              </p>
            </AccordionTrigger>
            <AccordionContent>
              <DateFromDateToPicker<TCustomerFilterParams>
                onDateChange={onDateChange}
                from={filterParams.DateFrom}
                to={filterParams.DateTo}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-2'>
            <AccordionTrigger className='text-xs'>
              <p className='flex flex-row justify-start items-end gap-4 [&>svg]:size-4 pb-4 w-full'>
                Trạng thái hoạt động
              </p>
            </AccordionTrigger>
            <AccordionContent className='flex gap-3 flex-wrap'>
              {Object.entries(CustomerStatus).map(([key, value]) => (
                <Badge
                  key={key}
                  className='text-xs basis-auto'
                  onClick={() =>
                    onFilterChange('ShowInactive', key === 'InActive')
                  }
                  variant={getVariant(filterParams.ShowInactive, key)}>
                  {matchCustomerStatus(value)}
                </Badge>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DrawerContent>
    </Drawer>
  )
}

export default MobileCustomerFilterComponents
