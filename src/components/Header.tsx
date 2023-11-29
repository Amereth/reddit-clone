import { SignIn, SignInButton, useUser, UserButton } from '@clerk/nextjs'
import { Button } from '@nextui-org/react'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { createContext, type ReactElement } from 'react'

export const HeaderContext = createContext<ReactElement | null>(null)

export const Header = () => {
  const router = useRouter()
  const { hashtag } = router.query as { hashtag?: string }

  const { isSignedIn } = useUser()

  const onGoBack = () => {
    if (router.route !== '/') {
      router.back()
      return
    }

    if (hashtag) {
      void router.push('/')
    }
  }

  const isBackButtonVisible = router.route !== '/' || hashtag

  return (
    <>
      <header className='flex h-16 items-center border-b-1 px-4'>
        {isSignedIn && (
          <>
            {isBackButtonVisible && (
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
