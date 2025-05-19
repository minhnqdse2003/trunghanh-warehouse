import type { BaseFilter } from '@/types/base-filter.type.req'
import { useDebounce } from '@uidotdev/usehooks'
import { useCallback, useState } from 'react'

export function useAppTable<TData, TFilter extends BaseFilter<unknown>>() {
  // State for pagination and filtering
  const [filterParams, setFilterParams] = useState<TFilter>({
    pageIndex: 0,
    pageSize: 10,
    Search: '',
  } as TFilter)

  // State for search term
  const [searchTerm, setSearchTerm] = useState<string>('')

  // State for row selection
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})
  const [selectedRowData, setSelectedRowData] = useState<TData | null>(null)

  // Debounced search term
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  // Handle search input
  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value)
  }, [])

  // Handle pagination
  const handlePageChange = useCallback((direction: 'next' | 'prev') => {
    setFilterParams(prev => ({
      ...prev,
      pageIndex:
        direction === 'next'
          ? prev.pageIndex + 1
          : Math.max(0, prev.pageIndex - 1),
    }))
  }, [])

  return {
    filterParams,
    setFilterParams,
    searchTerm,
    debouncedSearchTerm,
    handleSearch,
    rowSelection,
    setRowSelection,
    selectedRowData,
    setSelectedRowData,
    handlePageChange,
  }
}
