import { SignIn, SignInButton, useUser, UserButton } from '@clerk/nextjs'
import { Button } from '@nextui-org/react'
import { HomeIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { routes } from '~/utils/routes'
import { ChatRoomButton } from './ChatRoomButton'
import { ModeButton } from './ModeButton'

export const Header = () => {
  const router = useRouter()
  const params = new URLSearchParams(router.query as Record<string, string>)
  const hasParams = params.toString().length > 0

  const { isSignedIn } = useUser()

  const isBackButtonVisible = router.route !== '/' || hasParams

  return (
    <>
      <header className='flex h-16 items-center border-b-1 px-4'>
        {isBackButtonVisible && (
          <Link href={routes.home}>
            <Button isIconOnly className='mr-4' as='span'>
              <HomeIcon size={20} />
            </Button>
          </Link>
        )}

        {isSignedIn && (
          <>
            <Link href={routes.posts.create} className='mr-4'>
              <Button as='span'>create post</Button>
            </Link>

            <ChatRoomButton />
          </>
        )}

        <ModeButton className='ml-auto mr-4' />

        {isSignedIn ? (
          <UserButton />
        ) : (
          <SignInButton>
            <Button>log in</Button>
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
