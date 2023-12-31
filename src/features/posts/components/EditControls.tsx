import { Button, cn } from '@nextui-org/react'
import { PencilLineIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'

type EditControlsProps = {
  editLink?: string
  onDelete?: () => void
}

export const EditControls = ({ editLink, onDelete }: EditControlsProps) => {
  return (
    <>
      {editLink && (
        <Link href={editLink}>
          <Button
            isIconOnly
            size='sm'
            className={cn('min-w-0 p-0 hover:text-orange-400')}
            as='span'
          >
            <PencilLineIcon size={20} />
          </Button>
        </Link>
      )}

      {onDelete && (
        <Button
          isIconOnly
          size='sm'
          className={cn('min-w-0 p-0 hover:text-orange-400')}
          onClick={onDelete}
        >
          <TrashIcon size={20} />
        </Button>
      )}
    </>
  )
}
