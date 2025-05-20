import type { Customer } from '@/types/customer/customer.type.data'
import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '../ui/checkbox'
import { Badge } from '../ui/badge'
import { CheckCircle2, Dot, OctagonAlert } from 'lucide-react'

const customerColumnDef: ColumnDef<Customer>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='cursor-pointer'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='mr-2.5 cursor-pointer'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'customerId',
    header: 'Mã KH',
    enableSorting: true,
    cell: ({ row }) => row.original.customerId ?? 'N/A',
  },
  {
    accessorKey: 'customerName',
    header: 'Tên khách hàng',
    enableSorting: true,
    cell: ({ row }) => row.original.customerName ?? 'N/A',
  },
  {
    accessorKey: 'address',
    header: 'Địa chỉ',
    cell: ({ row }) => row.original.address ?? 'N/A',
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Số điện thoại',
    cell: ({ row }) => row.original.phoneNumber ?? 'N/A',
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => row.original.email ?? 'N/A',
  },
  {
    accessorKey: 'documentNumber',
    header: 'Số chứng từ',
    cell: ({ row }) => row.original.documentNumber ?? 'N/A',
  },
  {
    accessorKey: 'isLoyal',
    header: 'Khách hàng thân thiết',
    cell: ({ row }) =>
      row.original.isLoyal ? (
        <Badge className='w-full bg-[var(--success-foreground)] text-[var(--success-primary)] [&>svg]:size-3'>
          <CheckCircle2 />
          Có
        </Badge>
      ) : (
        <Badge
          className='w-full bg-[var(--warning-foreground)] text-[var(--warning-primary)] [&>svg]:size-3'
          variant='secondary'>
          <OctagonAlert />
          Không
        </Badge>
      ),
    enableSorting: true,
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => {
      const status = row.original.status
      switch (status) {
        case 1:
          return (
            <Badge className='w-full bg-[var(--success-foreground)] text-[var(--success-primary)] [&>svg]:size-3'>
              <Dot className='animate-ping' />
              Hoạt động
            </Badge>
          )
        case 2:
          return 'Không hoạt động'
        default:
          return status || 'N/A'
      }
    },
    enableSorting: true,
  },
]

export const CustomerColumnsDefOptions = {
  base: customerColumnDef,
}
