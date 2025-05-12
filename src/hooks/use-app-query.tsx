import { createErrorHandler } from '@/utils/matchError'
import {
  matchQueryStatus,
  type MatchQueryStatusOptions,
  type MatchQueryStatusOptionsWithEmpty,
} from '@/utils/matchQueryStatus'
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import useAuth from './use-auth'
import type { JSX } from 'react'

type RenderOptionsType<TData> = Omit<
  MatchQueryStatusOptionsWithEmpty<TData>,
  'Empty' | 'Errored'
> & {
  Empty?: JSX.Element
  Errored?: (error: Error) => void
}

interface UseAppQueryOptions<TData = unknown, TError = Error> {
  queryFn: () => Promise<TData>
  queryKey: unknown[]
  options?: Omit<UseQueryOptions<TData, TError, TData>, 'queryKey' | 'queryFn'>
  render: RenderOptionsType<TData>
}

export function useAppQuery<TData>(props: UseAppQueryOptions<TData>) {
  const { queryFn, queryKey, options, render } = props

  const navigate = useNavigate()
  const { onUserSignOut } = useAuth()

  const query = useQuery<TData, Error, TData>({
    queryKey,
    queryFn,
    ...options,
  })

  const baseOptions = {
    Loading: render.Loading,
    Errored: error => {
      createErrorHandler(navigate, onUserSignOut, render.Errored)(error)
    },
    Success: render.Success,
  } as MatchQueryStatusOptions<TData>

  if (render?.Empty) {
    return matchQueryStatus<TData>(query, {
      ...baseOptions,
      Empty: render.Empty,
    })
  }

  return matchQueryStatus<TData>(query, baseOptions)
}
