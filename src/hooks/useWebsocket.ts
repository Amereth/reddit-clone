import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { type Author } from '~/types'

type Args = {
  url: string
  onConnectionStatusChange?: (status: WebSocket['readyState']) => void
  onHistoryChange?: (history: MessageContent[]) => void
  onMessage?: (message: IncBasicMessage) => void
  onError?: (error: unknown) => void
}

export const useWebsocket = ({
  url,
  onConnectionStatusChange,
  onHistoryChange,
  onMessage,
  onError,
}: Args) => {
  const { getToken } = useAuth()
  const [isAuthenticated, setAuthenticated] = useState(false)

  const [socket] = useState<WebSocket>(new WebSocket(url))

  useEffect(() => {
    onConnectionStatusChange?.(socket.readyState)
  }, [socket.readyState, onConnectionStatusChange])

  useEffect(() => {
    socket.addEventListener('open', async () => {
      const token = await getToken()
      if (!token) return
      const authMessage: AuthMessage = {
        type: 'auth',
        content: token,
      }
      socket.send(JSON.stringify(authMessage))
      setAuthenticated(true)
    })

    // socket.addEventListener('close', () => {})

    socket.addEventListener('message', (event: MessageEvent<string>) => {
      try {
        const message = JSON.parse(event.data) as IncomingMessage

        if (message.type === 'history') {
          onHistoryChange?.(message.content)
        }

        if (message.type === 'message') {
          onMessage?.(message)
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message)
        }

        if (typeof error === 'string') {
          toast.error(error)
        }

        onError?.(error)
      }
    })

    socket.addEventListener('close', () => {
      setAuthenticated(false)
    })

    return () => {
      socket.close()
    }
  }, [socket, onHistoryChange, onMessage, onError, getToken])

  const postMessage = (content: string) => {
    const outMessage: OutgoingMessage = { type: 'message', content }
    socket.send(JSON.stringify(outMessage))
  }

  return {
    socket,
    postMessage,
    connectionStatus: socket.readyState,
    isAuthenticated,
  }
}

export type ErrorMessage = {
  type: 'error'
  content: string
}

export type HistoryMessage = {
  type: 'history'
  content: MessageContent[]
}

export type IncBasicMessage = {
  type: 'message'
  content: MessageContent
}

export type MessageContent = {
  id: string
  content: string
  author: Author
  createdAt: string
  updatedAt: string | null
  deletedAt: string | null
}

export type AuthMessage = {
  type: 'auth'
  content: string
}

export type OutBasicMessage = {
  type: 'message'
  content: string
}

export type IncomingMessage = ErrorMessage | HistoryMessage | IncBasicMessage

export type OutgoingMessage = AuthMessage | OutBasicMessage
