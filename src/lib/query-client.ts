import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache duration: How long data stays in cache before being marked stale
      gcTime: 5 * 60 * 1000, // 5 minutes

      // Stale time: How long data is considered fresh before refetching
      staleTime: 30 * 1000, // 30 seconds for most queries

      // Refetch behavior
      refetchOnWindowFocus: true, // Refetch when user returns to app
      refetchOnMount: true, // Refetch when component mounts
      refetchOnReconnect: true, // Refetch on network reconnect
      refetchInterval: false, // Disable polling by default

      // Retry failed queries
      retry: 2, // Retry failed requests twice
      retryDelay: attempt => Math.min(1000 * 2 ** attempt, 30000), // Exponential backoff, max 30s
    },
    mutations: {
      // Retry failed mutations
      retry: 1, // Retry mutations once
      retryDelay: 1000, // 1 second delay
    },
  },
})
