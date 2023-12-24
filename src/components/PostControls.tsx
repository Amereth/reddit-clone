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
import { toast } from 'sonner'
import { useDeletePost } from '~/api/posts/useDeletePost'
import {
  type LikeOrDislikeAction,
  useLikeDislikePost,
} from '~/api/posts/useLikeDislikePost'
import { type Post } from '~/types'
import { routes } from '~/utils/routes'

type PostLikeControlsProps = {
  post: Post
}

export const PostControls = ({ post }: PostLikeControlsProps) => {
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

      <span>|</span>

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

      <Link href={routes.posts.byId(post.id)}>
        <Button
          size='sm'
          className='text-md rounded-3xl'
          variant='bordered'
          as='span'
        >
          <MessageCircleIcon />
          <span>302</span>
        </Button>
      </Link>

      {user?.id === post.author.userId && (
        <div className='ml-auto flex gap-4'>
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
