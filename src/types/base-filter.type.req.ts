import type { PaginationRequest } from './pagination.type.req'

export type BaseFilter<IFilterParams> = IFilterParams &
  PaginationRequest & {
    Search?: string
    DateFrom?: Date
    DateTo?: Date
  }
