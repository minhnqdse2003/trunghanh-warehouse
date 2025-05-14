import { QueryClient } from '@tanstack/react-query'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { persistQueryClient } from '@tanstack/react-query-persist-client'

export const authQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: Infinity,
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
})

const authStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
  key: 'auth-cache',
  throttleTime: 1000,
})

persistQueryClient({
  queryClient: authQueryClient,
  persister: authStoragePersister,
  maxAge: 1000 * 60 * 60 * 24 * 30,
})
