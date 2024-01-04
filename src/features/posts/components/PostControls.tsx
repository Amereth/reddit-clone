import { useUser } from '@clerk/nextjs'
import { Button } from '@nextui-org/react'
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
import { EditControls } from './EditControls'
import { LikeControls } from './LikeControls'

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
      <div className='flex items-center gap-3 px-3 py-1'>
        <LikeControls
          likes={post.likes}
          dislikes={post.dislikes}
          isLiked={post.isLiked}
          isDisliked={post.isLiked}
          onLike={() => onLikeOrDislikePost('like')}
          onDislike={() => onLikeOrDislikePost('dislike')}
        />
      </div>

      {onCommentClick ? (
        <Button
          onClick={onCommentClick}
          className='flex items-center gap-2 px-3 py-1 hover:border-orange-400'
          variant='light'
        >
          <MessageCircleIcon />
          <span>{post.comments.length}</span>
        </Button>
      ) : (
        <Link
          href={routes.posts.byId(post.id)}
          className='flex items-center gap-2 px-3 py-1 hover:border-orange-400'
        >
          <MessageCircleIcon />
          <span>{post.comments.length}</span>
        </Link>
      )}

      {user?.id === post.author.userId && (
        <div className='ml-auto flex items-center gap-3 px-3 py-1'>
          <EditControls
            editLink={routes.posts.edit(post.id)}
            onDelete={() => deletePost(post.id)}
          />
        </div>
      )}
    </>
  )
}
