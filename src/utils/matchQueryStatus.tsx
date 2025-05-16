import type { BaseResponse } from '@/types/base.type.res'
import type { UseQueryResult } from '@tanstack/react-query'
import { type ReactNode } from 'react'

// Implementation
export function matchQueryStatus<TData, T extends BaseResponse<TData>>(
  query: UseQueryResult<T, Error>,
  {
    Loading,
    Empty,
    Success,
  }: {
    Loading: ReactNode
    Empty: ReactNode
    Success: ReactNode
  },
): ReactNode {
  if (query.isLoading) return Loading
  const isEmpty = !query.data || query.data.items.length === 0
  if (isEmpty && Empty) return Empty
  return Success
}
