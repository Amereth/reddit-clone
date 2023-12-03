import { Raleway } from 'next/font/google'
import { type PropsWithChildren } from 'react'
import { cn } from '~/utils/cn'
import { Header, HeaderContext } from './Header'

const raleway = Raleway({ subsets: ['latin', 'cyrillic'] })

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <HeaderContext.Provider value={null}>
      <div
        className={cn(
          'flex min-h-[100vh] flex-col bg-background tracking-wide text-foreground dark',
          raleway.className,
        )}
      >
        <Header />
        <main className='flex-1 px-4 pt-4 lg:py-8'>{children}</main>
      </div>
    </HeaderContext.Provider>
  )
}
