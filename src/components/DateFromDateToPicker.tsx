import { DateTimePicker } from './date-picker'
import { ArrowRightLeft } from 'lucide-react'
import type { BaseFilter } from '@/types/base-filter.type.req'

interface IDateFromDateToPicker<TFilter extends BaseFilter<unknown>> {
  onDateChange: (date: Date | undefined, type: keyof TFilter) => void
  from?: Date
  to?: Date
}

export default function DateFromDateToPicker<
  TFilter extends BaseFilter<unknown>,
>({ from, to, onDateChange }: Readonly<IDateFromDateToPicker<TFilter>>) {
  return (
    <div className='flex gap-2 items-center justify-center'>
      <DateTimePicker
        hourCycle={24}
        displayFormat={{ hour24: 'MM/dd/yyyy' }}
        placeholder='Từ Ngày'
        granularity='day'
        value={from}
        onChange={date => onDateChange(date, 'DateFrom')}
        className='basis-1/3 grow'
      />
      <ArrowRightLeft className='size-4' />
      <DateTimePicker
        hourCycle={24}
        granularity='day'
        placeholder='Đến Ngày'
        displayFormat={{ hour24: 'MM/dd/yyyy' }}
        value={to}
        onChange={date => onDateChange(date, 'DateTo')}
        className='basis-1/3 grow'
      />
    </div>
  )
}
