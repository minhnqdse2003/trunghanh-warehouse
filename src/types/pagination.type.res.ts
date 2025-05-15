export interface PaginationResponse {
  totalCount: number
  pageSize: number
  currentPage: number
  totalPages: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}
