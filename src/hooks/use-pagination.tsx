import { useMemo } from 'react'

interface IUsePagination {
  totalCount: number | undefined
  pageIndex: number
  pageSize: number
}

export const usePagination = ({
  totalCount,
  pageSize,
  pageIndex,
}: IUsePagination) => {
  const totalPages = useMemo(
    () => Math.ceil((totalCount ?? 0) / pageSize),
    [totalCount, pageSize],
  )

  const isPrevDisabled = useMemo(() => pageIndex === 0, [pageIndex])

  const isNextDisabled = useMemo(
    () => pageIndex >= totalPages - 1,
    [pageIndex, totalPages],
  )

  return { totalPages, isPrevDisabled, isNextDisabled }
}
