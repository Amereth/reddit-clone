import {
  type PropsWithChildren,
  createContext,
  useState,
  useContext,
} from 'react'

type ChatRoomContext = {
  isOnline: boolean
  setOnline: (isOnline: boolean) => void
}

const ChatRoomContext = createContext<ChatRoomContext>({
  isOnline: false,
  setOnline: () => null,
})

export const useChatRoomContext = () => useContext(ChatRoomContext)

export const ChatRoomProvider = ({ children }: PropsWithChildren) => {
  const [isOnline, setOnline] = useState(false)

  return (
    <ChatRoomContext.Provider
      value={{
        isOnline,
        setOnline,
      }}
    >
      {children}
    </ChatRoomContext.Provider>
  )
}
