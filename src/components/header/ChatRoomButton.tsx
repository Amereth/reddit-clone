import { Button } from '@nextui-org/react'
import clsx from 'clsx'
import { MessagesSquareIcon, CircleIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useChatRoomContext } from '~/features/chatRoom/ChatRoomContext'
import { routes } from '~/utils/routes'

export const ChatRoomButton = () => {
  const { isOnline } = useChatRoomContext()

  const { route } = useRouter()

  if (route === '/chat') {
    return (
      <Button
        variant='bordered'
        disabled={isOnline}
        onClick={() => window.location.reload()}
      >
        <MessagesSquareIcon size={20} />
        {isOnline ? 'online' : 'offline, reload'}
        <CircleIcon
          size={20}
          className={clsx({
            'text-green-500': isOnline,
            'text-red-500': !isOnline,
          })}
        />
      </Button>
    )
  }

  return (
    <Link href={routes.chat}>
      <Button variant='bordered' as='span'>
        <MessagesSquareIcon size={20} />
        chat room
        <CircleIcon
          size={20}
          className={clsx({
            'text-green-500': isOnline,
            'text-red-500': !isOnline,
          })}
        />
      </Button>
    </Link>
  )
}
