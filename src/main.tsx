import { createRoot } from 'react-dom/client'
import './index.css'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import '@fontsource-variable/nunito-sans'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index.tsx'
import { Toaster } from '@/components/ui/sonner'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/query-client.ts'
import { StrictMode } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
