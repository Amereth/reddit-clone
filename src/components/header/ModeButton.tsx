import { Button } from '@nextui-org/react'
import { SunIcon, MoonIcon } from 'lucide-react'
import { useMode } from '~/hooks/useMode'
import { cn } from '~/utils/cn'

type ModeButtonProps = {
  className?: string
}

export const ModeButton = ({ className }: ModeButtonProps) => {
  const { setMode, isDarkMode } = useMode()

  return (
    <Button
      onClick={() => setMode(isDarkMode ? 'light' : 'dark')}
      className={cn('min-w-0 p-0', className)}
      variant='light'
      isIconOnly
    >
      {isDarkMode ? <MoonIcon size={20} /> : <SunIcon size={20} />}
    </Button>
  )
}
