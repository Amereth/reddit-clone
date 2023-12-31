import { Button, cn } from '@nextui-org/react'
import { ChevronUpIcon, ChevronDownIcon } from 'lucide-react'

type LikeControlsProps = {
  totalLikes: number
  totalDislikes: number
  isLiked: boolean
  isDisliked: boolean
  onLike: () => void
  onDislike: () => void
}

export const LikeControls = ({
  totalLikes,
  totalDislikes,
  isLiked,
  isDisliked,
  onLike,
  onDislike,
}: LikeControlsProps) => {
  return (
    <>
      <span>{totalLikes}</span>
      <Button
        isIconOnly
        size='sm'
        className={cn('p-0 hover:text-orange-400', {
          'text-orange-400': isLiked,
        })}
        onClick={onLike}
      >
        <ChevronUpIcon />
      </Button>

      <Button
        isIconOnly
        size='sm'
        className={cn('p-0 hover:text-orange-400', {
          'text-orange-400': isDisliked,
        })}
        onClick={onDislike}
      >
        <ChevronDownIcon />
      </Button>
      <span>{totalDislikes}</span>
    </>
  )
}
