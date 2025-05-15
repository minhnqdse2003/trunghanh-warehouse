import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { PaginationRequest } from '@/types/pagination.type.req'
import { Button } from '../ui/button'
import { LoadingSpinner } from '../LoadingSpiner'
import { type ReactNode } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

interface DataTableProps<TData, TColumns, TFilterParams> {
  columns: ColumnDef<TData, TColumns>[]
  data: TData[]
  filter: {
    params: TFilterParams
    setPagination: React.Dispatch<React.SetStateAction<PaginationState>>
    rowCount: number
  }
  loading: boolean
}

export function DataTable<
  TData,
  TValue,
  TFilterParams extends PaginationRequest,
>({
  columns,
  data,
  filter,
  loading,
}: Readonly<DataTableProps<TData, TValue, TFilterParams>>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    rowCount: filter.rowCount,
    onPaginationChange: filter.setPagination,
    manualPagination: true,
    state: {
      pagination: {
        pageIndex: filter.params.pageIndex,
        pageSize: filter.params.pageSize,
      },
    },
  })

  const getStyleForFirstAndLastColumn = (
    idx: number,
    length: number,
  ): string => {
    if (idx === 0) return 'border-l-0'
    if (idx === length - 1) return 'border-r-0'
    return 'border-l-1 border-r-1'
  }

  return (
    <>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, idx) => {
                return (
                  <TableHead
                    key={header.id}
                    className={getStyleForFirstAndLastColumn(
                      idx,
                      headerGroup.headers.length,
                    )}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {matchQueryStatus(
            { loading, isEmpty: table.getRowModel().rows?.length === 0 },
            {
              empty: (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'>
                    Không có dữ liệu.
                  </TableCell>
                </TableRow>
              ),
              loading: (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'>
                    <LoadingSpinner className='my-0 mx-auto' />
                  </TableCell>
                </TableRow>
              ),
              hasData: table.getRowModel().rows.map((row, idx) => (
                <TableRow
                  key={row.id}
                  className={
                    idx === table.getRowModel().rows.length - 1
                      ? '[&>td]:border-b-0'
                      : ''
                  }
                  data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell, idx) => (
                    <TableCell
                      key={cell.id}
                      className={getStyleForFirstAndLastColumn(
                        idx,
                        row.getVisibleCells().length,
                      )}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              )),
            },
          )}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      {filter && (
        <div className='flex items-center justify-end space-x-2 py-4'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            <ChevronLeftIcon />
            Trước
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Sau
            <ChevronRightIcon />
          </Button>
        </div>
      )}
    </>
  )
}

const matchQueryStatus = (
  condition: { loading: boolean; isEmpty: boolean },
  render: { loading: ReactNode; empty: ReactNode; hasData: ReactNode },
) => {
  if (condition.loading) return render.loading
  if (condition.isEmpty) {
    return render.empty
  }
  return render.hasData
}
