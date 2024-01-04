import { useUser } from '@clerk/nextjs'
import { type PostComment } from '~/types'
import { EditControls } from './EditControls'
import { LikeControls } from './LikeControls'

type PostCommentProps = {
  comment: PostComment
}

export const Comment = ({ comment }: PostCommentProps) => {
  const { user } = useUser()

  return (
    <div className='flex w-full flex-col items-start rounded-medium border-1 border-gray-700 py-1'>
      <p className='px-3'>{comment.body}</p>

      <div className='flex items-center gap-2 px-3 py-1'>
        <LikeControls
          likes={comment.likes}
          isLiked={comment.isLiked}
          onLike={() => null}
          dislikes={comment.dislikes}
          isDisliked={comment.isDisliked}
          onDislike={() => null}
        />

        {comment.author.userId === user?.id && <EditControls />}
      </div>
    </div>
  )
}
