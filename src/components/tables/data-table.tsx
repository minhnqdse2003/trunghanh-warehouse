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
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { matchQueryStatus } from '@/utils/matchQueryStatus'
import type { UseQueryResult } from '@tanstack/react-query'
import type { BaseResponse } from '@/types/base.type.res'
import { useMemo } from 'react'

interface DataTableProps<
  TData,
  TColumns,
  TFilterParams,
  TQuery extends BaseResponse<TData>,
> {
  columns: ColumnDef<TData, TColumns>[]
  query: UseQueryResult<TQuery, Error>
  filter: {
    params: TFilterParams
    setPagination: React.Dispatch<React.SetStateAction<PaginationState>>
    rowCount: number
  }
}

export function DataTable<
  TData,
  TColumns,
  TFilterParams extends PaginationRequest,
  TQuery extends BaseResponse<TData>,
>({
  columns,
  query,
  filter,
}: Readonly<DataTableProps<TData, TColumns, TFilterParams, TQuery>>) {
  const defaultFallback = useMemo(() => [], [])
  const table = useReactTable({
    data: query.data?.items ?? defaultFallback,
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

  return (
    <>
      <Table className='border rounded-2xl overflow-clip'>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <TableHead key={header.id}>
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
          {matchQueryStatus<TData, TQuery>(query, {
            Empty: (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'>
                  Không có dữ liệu.
                </TableCell>
              </TableRow>
            ),
            Loading: (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'>
                  <LoadingSpinner className='my-0 mx-auto' />
                </TableCell>
              </TableRow>
            ),
            Success: table.getRowModel().rows.map((row, idx) => (
              <TableRow
                key={row.id}
                className={
                  idx === table.getRowModel().rows.length - 1
                    ? '[&>td]:border-b-0'
                    : ''
                }
                data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            )),
          })}
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
