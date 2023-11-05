import { SignIn, SignInButton, useUser, UserButton } from '@clerk/nextjs'
import { Button } from '@nextui-org/react'
import Link from 'next/link'

export const Header = () => {
  const { isSignedIn } = useUser()
  const isNotSignedIn = !isSignedIn

  return (
    <>
      <header className='flex h-16 items-center border-b-1 px-4'>
        <Link className='mr-auto' href='/create-post'>
          <Button>create post</Button>
        </Link>

        {isSignedIn && <UserButton />}

        {isNotSignedIn && (
          <SignInButton>
            <button className='button'>login</button>
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
