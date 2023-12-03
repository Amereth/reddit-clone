import { Button } from '@nextui-org/react'
import { SunIcon, MoonIcon } from 'lucide-react'
import { useMode } from '~/hooks/useMode'

export const ModeButton = () => {
  const { setMode, isDarkMode } = useMode()

  return (
    <Button
      onClick={() => setMode(isDarkMode ? 'light' : 'dark')}
      className='ml-auto mr-4 min-w-0 p-0'
      variant='light'
      isIconOnly
    >
      {isDarkMode ? <MoonIcon size={20} /> : <SunIcon size={20} />}
    </Button>
  )
}
