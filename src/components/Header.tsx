import { SignIn, SignInButton, useUser, UserButton } from '@clerk/nextjs'
import { Button } from '@nextui-org/react'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { createContext, type ReactElement } from 'react'

export const HeaderContext = createContext<ReactElement | null>(null)

export const Header = () => {
  const router = useRouter()
  const { isSignedIn } = useUser()

  const onGoBack = () => router.back()

  return (
    <>
      <header className='flex h-16 items-center border-b-1 px-4'>
        {isSignedIn && (
          <>
            {router.route !== '/' && (
              <Button isIconOnly onClick={onGoBack} className='mr-4'>
                <ChevronLeft />
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
            <Button className='ml-auto'>login</Button>
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
