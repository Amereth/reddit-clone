import { SignIn, SignInButton, useUser, UserButton } from '@clerk/nextjs'
import { Button } from '@nextui-org/react'
import { HomeIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { createContext, type ReactElement } from 'react'

export const HeaderContext = createContext<ReactElement | null>(null)

export const Header = () => {
  const router = useRouter()
  const params = new URLSearchParams(router.query as Record<string, string>)
  const hasParams = params.toString().length > 0

  const { isSignedIn } = useUser()

  const isBackButtonVisible = router.route !== '/' || hasParams

  return (
    <>
      <header className='flex h-16 items-center border-b-1 px-4'>
        {isSignedIn && (
          <>
            {isBackButtonVisible && (
              <Button
                isIconOnly
                onClick={() => router.push('/')}
                className='mr-4'
              >
                <HomeIcon size={20} />
              </Button>
            )}

            <Link href='/create-post'>
              <Button>create post</Button>
            </Link>

            <div className='ml-auto'>
              <UserButton />
            </div>
          </>
        )}

        {!isSignedIn && (
          <SignInButton>
            <Button className='ml-auto'>log in</Button>
          </SignInButton>
        )}
      </header>

      <SignIn
        path='/sign-in'
        routing='path'
        signUpUrl='/sign-up'
        afterSignInUrl='/'
      />
    </>
  )
}
