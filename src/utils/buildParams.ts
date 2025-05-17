/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BaseFilter } from '@/types/base-filter.type.req'

export const buildQueryParams = (filter: BaseFilter<unknown>) => {
  const { pageIndex, pageSize, DateFrom, DateTo, ...rest } = filter

  const filterParams = Object.fromEntries(
    Object.entries({
      ...rest,
      PageSize: pageSize,
      Page: pageIndex + 1,
      DateFrom: DateFrom?.toISOString(),
      DateTo: DateTo?.toISOString(),
    }).filter(([, value]) => value !== null && value !== undefined),
  ) as Record<string, any>

  return new URLSearchParams(filterParams)
}
