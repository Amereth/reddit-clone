import { type PostComment } from '~/types'
import { EditControls } from './EditControls'
import { LikeControls } from './LikeControls'

type PostCommentProps = {
  comment: PostComment
}

export const Comment = ({ comment }: PostCommentProps) => {
  return (
    <div className='flex w-full flex-col items-start'>
      <p>{comment.body}</p>
      <div className='flex items-center gap-2 rounded-3xl border-1 border-gray-700 px-3 py-1'>
        <LikeControls
          likes={2}
          isLiked={false}
          onLike={() => null}
          dislikes={1}
          isDisliked={false}
          onDislike={() => null}
        />

        <EditControls />
      </div>
    </div>
  )
}
