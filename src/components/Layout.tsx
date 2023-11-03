import { cn } from 'lib/cn'
import { Raleway } from 'next/font/google'
import { type PropsWithChildren } from 'react'
import { Header } from './Header'

const raleway = Raleway({ subsets: ['latin'] })

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={cn(
        'dark text-foreground bg-background flex-col',
        raleway.className,
      )}
    >
      <Header />
      <main>{children}</main>
    </div>
  )
}
