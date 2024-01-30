import { ClerkProvider } from '@clerk/nextjs'
import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import dayjs from 'dayjs'
import dayjsUtcPlugin from 'dayjs/plugin/utc'
import { type AppType } from 'next/dist/shared/lib/utils'
import { Toaster } from 'sonner'
import { Layout } from '~/components/Layout'
import { ChatRoomProvider } from '~/features/chatRoom/ChatRoomContext'
import '~/styles/globals.css'

dayjs.extend(dayjsUtcPlugin)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      staleTime: 1000 * 60 * 5,
    },
  },
})

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <ChatRoomProvider>
            <Layout>
              <Component {...pageProps} />
              <Toaster richColors />
            </Layout>
          </ChatRoomProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </NextUIProvider>
      </QueryClientProvider>
    </ClerkProvider>
  )
}

export default MyApp
