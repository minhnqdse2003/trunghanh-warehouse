import type { UseQueryResult } from '@tanstack/react-query'
import type { JSX } from 'react'

// Overload 1: With Empty component
export function matchQueryStatus<T>(
  query: UseQueryResult<T>,
  options: MatchQueryStatusOptionsWithEmpty<T>,
): JSX.Element

// Overload 2: Without Empty component
export function matchQueryStatus<T>(
  query: UseQueryResult<T>,
  options: MatchQueryStatusOptions<T>,
): JSX.Element

// Implementation
export function matchQueryStatus<T>(
  query: UseQueryResult<T>,
  {
    Idle,
    Loading,
    Errored,
    Empty,
    Success,
  }: {
    Idle: JSX.Element
    Loading: JSX.Element
    Errored: (error: Error) => void
    Empty?: JSX.Element
    Success: (data: UseQueryResult<T>) => void
  },
): JSX.Element {
  if (query.isLoading) return Loading
  if (query.isError) {
    if (typeof Errored === 'function') Errored(query.error)
  }
  const isEmpty =
    query.data === undefined ||
    query.data === null ||
    (Array.isArray(query.data) && query.data.length === 0)
  if (isEmpty && Empty) return Empty
  if (query.isSuccess) Success(query)
  return Idle
}

export interface MatchQueryStatusOptions<T> {
  Idle: JSX.Element
  Loading: JSX.Element
  Errored: (error: Error) => void
  Success: (data: UseQueryResult<T>) => void
}

export interface MatchQueryStatusOptionsWithEmpty<T> {
  Idle: JSX.Element
  Loading: JSX.Element
  Errored: (error: Error) => void
  Empty: JSX.Element
  Success: (data: UseQueryResult<T> & { data: T }) => void
}
