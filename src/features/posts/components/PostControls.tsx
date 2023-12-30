import { useUser } from '@clerk/nextjs'
import { Button, cn } from '@nextui-org/react'
import {
  PencilLineIcon,
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from 'lucide-react'
import { MessageCircleIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { type MouseEvent } from 'react'
import { toast } from 'sonner'
import { useDeletePost } from '~/features/posts/hooks/useDeletePost'
import {
  type LikeOrDislikeAction,
  useLikeDislikePost,
} from '~/features/posts/hooks/useLikeDislikePost'
import { type Post } from '~/types'
import { routes } from '~/utils/routes'

type PostLikeControlsProps = {
  post: Post
  onCommentClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

export const PostControls = ({
  post,
  onCommentClick,
}: PostLikeControlsProps) => {
  const router = useRouter()
  const { user, isSignedIn } = useUser()
  const { mutate } = useLikeDislikePost()
  const { mutate: deletePost } = useDeletePost({
    onSuccess() {
      void router.push('/')
    },
  })

  const onLikeOrDislikePost = (action: LikeOrDislikeAction) => {
    if (!isSignedIn) {
      toast.error('you must be logged in to do that')
      return
    }
    mutate({ postId: post.id, action })
  }

  return (
    <>
      <div className='flex items-center gap-3 rounded-3xl border-1 border-gray-700 px-3 py-1'>
        <span>{post.likes.total}</span>
        <Button
          isIconOnly
          size='sm'
          className={cn('p-0 hover:text-orange-400', {
            'text-orange-400': post.likes.isLiked,
          })}
          onClick={() => onLikeOrDislikePost('like')}
        >
          <ChevronUpIcon />
        </Button>

        <Button
          isIconOnly
          size='sm'
          className={cn('p-0 hover:text-orange-400', {
            'text-orange-400': post.dislikes.isLiked,
          })}
          onClick={() => onLikeOrDislikePost('dislike')}
        >
          <ChevronDownIcon />
        </Button>
        <span>{post.dislikes.total}</span>
      </div>

      {onCommentClick ? (
        <Button
          onClick={onCommentClick}
          className='flex items-center gap-2 rounded-3xl border-1 border-gray-700 px-3 py-1 hover:border-orange-400'
        >
          <MessageCircleIcon />
          <span>{post.comments.length}</span>
        </Button>
      ) : (
        <Link
          href={routes.posts.byId(post.id)}
          className='flex items-center gap-2 rounded-3xl border-1 border-gray-700 px-3 py-1 hover:border-orange-400'
        >
          <MessageCircleIcon />
          <span>{post.comments.length}</span>
        </Link>
      )}

      {user?.id === post.author.userId && (
        <div className='ml-auto flex items-center gap-3 rounded-3xl border-1 border-gray-700 px-3 py-1'>
          <Link href={routes.posts.edit(post.id)}>
            <Button
              isIconOnly
              size='sm'
              className={cn('min-w-0 p-0 hover:text-orange-400')}
              as='span'
            >
              <PencilLineIcon size={20} />
            </Button>
          </Link>

          <Button
            isIconOnly
            size='sm'
            className={cn('min-w-0 p-0 hover:text-orange-400')}
            onClick={() => deletePost(post.id)}
          >
            <TrashIcon size={20} />
          </Button>
        </div>
      )}
    </>
  )
}
