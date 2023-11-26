import { useUser } from '@clerk/nextjs'
import { Button, cn } from '@nextui-org/react'
import { PencilLine } from 'lucide-react'
import { useRouter } from 'next/router'
import { useLikeDislikePost } from '~/api/posts/useLikeDislikePost'
import { ArrowIcon } from '~/icons/ArrowIcon'
import { type Post } from '~/types'

type PostLikeControlsProps = {
  post: Post
}

export const PostControls = ({ post }: PostLikeControlsProps) => {
  const router = useRouter()
  const { user } = useUser()
  const { mutate } = useLikeDislikePost()

  const onEditPost = () => router.push(`/edit-post/${post.id}`)

  return (
    <>
      <span>{post.likes.total}</span>
      <Button
        isIconOnly
        size='sm'
        className={cn('p-0 hover:text-orange-400', {
          'text-orange-400': post.likes.isLiked,
        })}
        onClick={() => mutate({ postId: post.id, action: 'like' })}
      >
        <ArrowIcon className='h-4 w-4' />
      </Button>

      <span>|</span>

      <Button
        isIconOnly
        size='sm'
        className={cn('p-0 hover:text-orange-400', {
          'text-orange-400': post.dislikes.isLiked,
        })}
        onClick={() => mutate({ postId: post.id, action: 'dislike' })}
      >
        <ArrowIcon className='h-4 w-4 rotate-180' />
      </Button>
      <span>{post.dislikes.total}</span>

      {user?.id === post.author.userId && (
        <Button
          isIconOnly
          size='sm'
          className={cn('ml-auto min-w-0 p-0 hover:text-orange-400')}
          onClick={onEditPost}
        >
          <PencilLine size={20} />
        </Button>
      )}
    </>
  )
}
