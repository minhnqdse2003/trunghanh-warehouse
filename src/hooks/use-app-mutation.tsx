import { createErrorHandler } from '@/utils/matchError'
import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import useAuth from './use-auth'
import { queryClient } from '@/lib/query-client'

interface UseAppMutationOptions<
  TData,
  TVariables = unknown,
  TContext = unknown,
> {
  mutationFn: (variables: TVariables) => Promise<TData>
  mutationKey?: unknown[]
  options?: Omit<
    UseMutationOptions<TData, Error, TVariables, TContext>,
    'mutationFn' | 'mutationKey'
  >
}

export function useAppMutation<TData, TVariables = unknown, TContext = unknown>(
  props: UseAppMutationOptions<TData, TVariables, TContext>,
) {
  const { mutationFn, mutationKey, options } = props

  const navigate = useNavigate()
  const { onUserSignOut } = useAuth()

  const mutation = useMutation<TData, Error, TVariables, TContext>({
    mutationFn,
    mutationKey,
    ...options,
  })

  if (mutation.isError) {
    createErrorHandler(navigate, onUserSignOut)(mutation.error)
    mutation.reset()
  }

  if (mutation.isSuccess) {
    queryClient.invalidateQueries({
      predicate: query =>
        query.queryKey.some((queryKey: unknown) =>
          mutationKey?.includes(queryKey),
        ),
    })
  }

  return mutation
}
