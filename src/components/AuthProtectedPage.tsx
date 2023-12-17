import { useUser } from '@clerk/nextjs'
import { type PropsWithChildren } from 'react'

export const AuthProtectedPage = ({ children }: PropsWithChildren) => {
  const { isSignedIn, isLoaded } = useUser()

  if (!isLoaded) return null

  if (!isSignedIn) {
    return (
      <div className='flex grow flex-col justify-center gap-8 text-center'>
        <div className='text-9xl'>404</div>
        <div className='text-3xl'>page not found</div>
      </div>
    )
  }

  return <>{children}</>
}
