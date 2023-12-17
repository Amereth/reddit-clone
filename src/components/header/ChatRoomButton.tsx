import { Button } from '@nextui-org/react'
import clsx from 'clsx'
import { MessagesSquareIcon, CircleIcon } from 'lucide-react'
import Link from 'next/link'

export const ChatRoomButton = () => {
  return (
    <Link href='/chat'>
      <Button variant='bordered' as='span'>
        <MessagesSquareIcon size={20} />
        chat room
        <CircleIcon
          size={20}
          className={clsx({
            // 'text-green-500': connectionStatus === WebSocket.OPEN,
            // 'text-red-500': connectionStatus === WebSocket.CLOSED,
            // 'text-blue-500-500': connectionStatus === WebSocket.CONNECTING,
          })}
        />
      </Button>
    </Link>
  )
}
