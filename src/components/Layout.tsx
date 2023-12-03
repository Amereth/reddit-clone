'use client'

import { Raleway } from 'next/font/google'
import { type PropsWithChildren } from 'react'
import { useMode } from '~/hooks/useMode'
import { cn } from '~/utils/cn'
import { Header } from './Header'

const raleway = Raleway({ subsets: ['latin', 'cyrillic'] })

export const Layout = ({ children }: PropsWithChildren) => {
  const { isDarkMode } = useMode()

  return (
    <div
      className={cn(
        'flex min-h-[100vh] flex-col bg-background tracking-wide text-foreground',
        raleway.className,
        isDarkMode && 'dark',
      )}
    >
      <Header />
      <main className='flex-1 px-4 pt-4 lg:py-8'>{children}</main>
    </div>
  )
}
