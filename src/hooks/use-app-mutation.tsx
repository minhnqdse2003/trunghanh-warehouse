import { createErrorHandler } from '@/utils/matchError'

import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import useAuth from './use-auth'

import {
  matchMutationStatus,
  type MatchMutationStatusOptions,
} from '@/utils/matchMutationStatus'

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
  render: Omit<MatchMutationStatusOptions<TData, TContext>, 'Errored'> & {
    Errored?: (error: Error) => void
  }
}

export function useAppMutation<TData, TVariables = unknown, TContext = unknown>(
  props: UseAppMutationOptions<TData, TVariables, TContext>,
) {
  const { mutationFn, mutationKey, options, render } = props

  const navigate = useNavigate()
  const { onUserSignOut } = useAuth()

  const mutation = useMutation<TData, Error, TVariables, TContext>({
    mutationFn,
    mutationKey,
    ...options,
  })

  const baseOptions = {
    Loading: render.Loading,
    Errored: (error: Error) => {
      createErrorHandler(navigate, onUserSignOut, render.Errored)(error)
      mutation.reset()
    },
    Success: render.Success,
    Idle: render.Idle,
  } as MatchMutationStatusOptions<TData, TContext>

  return {
    render: matchMutationStatus<TData, TContext, TVariables>(
      mutation,
      baseOptions,
    ),
    mutation,
  }
}
