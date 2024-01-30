import { useUser } from '@clerk/nextjs'
import { useState } from 'react'
import { type Post, type PostComment } from '~/types'
import { useEditComment } from '../hooks/useEditComment'
import { type CommentFormModel, EditCommentForm } from './EditCommentForm'
import { EditControls } from './EditControls'
import { LikeControls } from './LikeControls'

type PostCommentProps = {
  postId: Post['_id']
  comment: PostComment
}

export const Comment = ({ postId, comment }: PostCommentProps) => {
  const { user } = useUser()

  const [isEditing, setIsEditing] = useState(false)

  const { mutate } = useEditComment()

  const onSubmit = ({ body }: CommentFormModel) => {
    mutate({
      postId,
      commentId: comment._id,
      body,
    })
  }

  return (
    <div className='flex w-full flex-col items-stretch gap-4 rounded-medium border-1 border-gray-700 py-1'>
      {isEditing ? (
        <div className='p-4'>
          <EditCommentForm
            onSubmit={onSubmit}
            onCancel={() => setIsEditing((v) => !v)}
            isSubmitting={false}
            defaultValues={{ body: comment.body }}
          />
        </div>
      ) : (
        <p className='px-3'>{comment.body}</p>
      )}

      <div className='flex items-center gap-2 px-3 py-1'>
        <LikeControls
          likes={comment.likes}
          isLiked={comment.isLiked}
          onLike={() => null}
          dislikes={comment.dislikes}
          isDisliked={comment.isDisliked}
          onDislike={() => null}
        />

        <div className='ml-auto' />

        {comment.author.userId === user?.id && (
          <EditControls onEdit={() => setIsEditing((v) => !v)} />
        )}
      </div>
    </div>
  )
}
