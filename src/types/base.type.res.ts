import type { PaginationResponse } from './pagination.type.res'

export interface BaseResponse<TData> extends PaginationResponse {
  items: Array<TData>
}
