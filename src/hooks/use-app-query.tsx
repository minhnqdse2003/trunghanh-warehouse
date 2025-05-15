import { createErrorHandler } from '@/utils/matchError'
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import useAuth from './use-auth'

interface UseAppQueryOptions<TData = unknown, TError = Error> {
  queryFn: () => Promise<TData>
  queryKey: unknown[]
  options?: Omit<UseQueryOptions<TData, TError, TData>, 'queryKey' | 'queryFn'>
}

export function useAppQuery<TData>(props: UseAppQueryOptions<TData>) {
  const { queryFn, queryKey, options } = props
  const navigate = useNavigate()
  const { onUserSignOut } = useAuth()

  const query = useQuery<TData, Error, TData>({
    queryKey,
    queryFn,
    ...options,
  })

  if (query.isError) {
    createErrorHandler(navigate, onUserSignOut)(query.error)
  }

  return query
}
