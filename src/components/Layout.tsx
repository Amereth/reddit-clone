import { Raleway } from 'next/font/google'
import { type PropsWithChildren } from 'react'
import { cn } from '~/utils/cn'
import { Header } from './Header'

const raleway = Raleway({ subsets: ['latin'] })

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={cn(
        'flex min-h-[100vh] flex-col bg-background tracking-wide text-foreground dark',
        raleway.className,
      )}
    >
      <Header />
      <main className='flex-1 px-4 py-8'>{children}</main>
    </div>
  )
}
