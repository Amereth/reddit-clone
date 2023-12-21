import { useUser } from '@clerk/nextjs'
import { Button, Textarea } from '@nextui-org/react'
import { useCallback, useState } from 'react'
import { AuthProtectedPage } from '~/components/AuthProtectedPage'
import { env } from '~/env.mjs'
import { useChatRoomContext } from '~/features/chatRoom/ChatRoomContext'
import { type IncBasicMessage, useWebsocket } from '~/hooks/useWebsocket'
import { cn } from '~/utils/cn'

export default function Page() {
  return (
    <AuthProtectedPage>
      <ChatPage />
    </AuthProtectedPage>
  )
}

function ChatPage() {
  const { user } = useUser()
  const [message, setMessage] = useState('')
  const [history, setHistory] = useState<IncBasicMessage[]>([])
  const { setOnline } = useChatRoomContext()

  const onMessage = useCallback(
    (message: IncBasicMessage) => {
      setHistory((prev) => [...prev, message])
    },
    [setHistory],
  )

  const { postMessage } = useWebsocket({
    url: env.NEXT_PUBLIC_CHAT_ROOM_WS_URL,
    onMessage,
    onHistoryChange: setHistory,
    onConnectionStatusChange(status) {
      if (status === WebSocket.OPEN) setOnline(true)
      if (status === WebSocket.CLOSED) setOnline(false)
    },
  })

  const onPost = () => {
    postMessage(message)
    setMessage('')
  }

  return (
    <>
      <div className='mt-auto flex flex-col gap-4 overflow-y-auto'>
        {history.map((message) => (
          <div
            key={message.id}
            className={cn(
              'w-fit max-w-[60%] rounded-lg bg-gray-700 px-4 py-2 text-white',
              message.author.userId !== user?.id && 'bg-gray-700',
              message.author.userId === user?.id && 'ml-auto bg-blue-800',
            )}
          >
            {message.content}
          </div>
        ))}
      </div>

      <div className='mt-4 flex gap-4'>
        <Textarea
          size='sm'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button size='lg' onClick={onPost}>
          send
        </Button>
      </div>
    </>
  )
}
