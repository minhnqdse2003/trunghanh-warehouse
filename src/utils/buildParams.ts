// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const buildQueryParams = (filter: Record<string, any>) => {
  const { pageIndex, pageSize, ...rest } = filter
  return new URLSearchParams({
    ...rest,
    PageSize: pageSize,
    Page: pageIndex + 1,
  })
}
