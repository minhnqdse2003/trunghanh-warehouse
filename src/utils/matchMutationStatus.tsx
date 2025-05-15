import type { UseMutationResult } from '@tanstack/react-query'
import type { JSX } from 'react'

// Overload 1: With Empty component
export function matchMutationStatus<TData, TVariables>(
  mutation: UseMutationResult<TData, Error, TVariables>,
  { Loading, Errored, Success, Idle }: MatchMutationStatusOptions<TData>,
): JSX.Element {
  if (mutation.isPending) return Loading
  if (mutation.isError) Errored(mutation.error)
  if (mutation.isSuccess && mutation.data !== undefined) {
    Success(mutation.data)
  }
  return Idle
}

export interface MatchMutationStatusOptions<TData> {
  Idle: JSX.Element
  Loading: JSX.Element
  Errored: (error: Error) => void
  Success: (data: TData) => void
}
