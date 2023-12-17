import { Raleway } from 'next/font/google'
import { type PropsWithChildren } from 'react'
import { useMode } from '~/hooks/useMode'
import { cn } from '~/utils/cn'
import { Header } from './header'

const raleway = Raleway({ subsets: ['latin', 'cyrillic'] })

export const Layout = ({ children }: PropsWithChildren) => {
  const { isDarkMode } = useMode()

  return (
    <div
      className={cn(
        'flex h-[100vh] flex-col bg-background tracking-wide text-foreground',
        raleway.className,
        isDarkMode && 'dark',
      )}
    >
      <Header />
      <main className='flex flex-1 flex-col overflow-y-auto p-4 lg:py-8'>
        {children}
      </main>
    </div>
  )
}
