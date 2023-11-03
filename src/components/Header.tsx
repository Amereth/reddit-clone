import { SignIn, SignInButton, useUser, UserButton } from '@clerk/nextjs'
import { Button } from '@nextui-org/react'

export const Header = () => {
  const { isSignedIn } = useUser()
  const isNotSignedIn = !isSignedIn

  return (
    <>
      <header className='h-16 border-b-1 flex items-center px-4'>
        <Button className='mr-auto'>Create Post</Button>

        {isSignedIn && <UserButton />}

        {isNotSignedIn && (
          <SignInButton>
            <button className='button'>Login</button>
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
