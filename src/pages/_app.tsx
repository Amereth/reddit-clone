import { ClerkProvider } from '@clerk/nextjs'
import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { type AppType } from 'next/dist/shared/lib/utils'
import { Toaster } from 'sonner'
import { Layout } from '~/components/Layout'
import '~/styles/globals.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <Layout>
            <Component {...pageProps} />
            <Toaster />
          </Layout>
          <ReactQueryDevtools initialIsOpen={false} />
        </NextUIProvider>
      </QueryClientProvider>
    </ClerkProvider>
  )
}

export default MyApp
