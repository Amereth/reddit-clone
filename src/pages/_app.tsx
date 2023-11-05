import { ClerkProvider } from '@clerk/nextjs'
import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type AppType } from 'next/dist/shared/lib/utils'
import { Toaster } from 'sonner'
import { Layout } from '~/components/Layout'
import '~/styles/globals.css'

const queryClient = new QueryClient()

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <Layout>
            <Component {...pageProps} />
            <Toaster />
          </Layout>
        </NextUIProvider>
      </QueryClientProvider>
    </ClerkProvider>
  )
}

export default MyApp
