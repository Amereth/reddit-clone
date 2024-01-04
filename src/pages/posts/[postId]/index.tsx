import { User } from '@nextui-org/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'sonner'
import { Comment } from '~/features/posts/components/Comment'
import {
  type CommentFormModel,
  EditCommentForm,
} from '~/features/posts/components/EditCommentForm'
import { PostControls } from '~/features/posts/components/PostControls'
import { useCreateComment } from '~/features/posts/hooks/useCreateComment'
import { usePost } from '~/features/posts/hooks/usePost'
import { apiUrl } from '~/utils/apiUrl'

export default function PostPage() {
  const router = useRouter()
  const postId = router.query.postId as string

  const { data: post, error } = usePost(postId)

  const [showCommentForm, setShowCommentForm] = useState(false)
  const { mutate, isPending } = useCreateComment({
    onSuccess: () => {
      setShowCommentForm(false)
    },
  })

  if (error) {
    toast.error(error.message)
    void router.push('/')
    return null
  }

  if (!post) return null

  const createComment = (comment: CommentFormModel) => {
    mutate({
      postId: post.id,
      comment,
    })
  }

  return (
    <div className='mx-auto flex max-w-xl flex-col items-start gap-6'>
      <User
        name={`${post?.author.firstName} ${post?.author.lastName}`}
        avatarProps={{ src: post?.author.imageUrl ?? '' }}
      />
      <h2 className='text-2xl'>{post?.title}</h2>
      {post.imageUrl && (
        <div className='relative w-full'>
          <Image
            src={apiUrl(post.imageUrl)}
            alt='post image'
            style={{
              width: '100%',
              height: 'auto',
            }}
            width={500}
            height={300}
          />
        </div>
      )}

      <p className='leading-relaxed'>{post?.body}</p>

      <footer className='mt-10 flex w-full items-center gap-2'>
        <PostControls
          post={post}
          onCommentClick={() => setShowCommentForm((v) => !v)}
        />
      </footer>

      {showCommentForm && (
        <EditCommentForm onSubmit={createComment} isSubmitting={isPending} />
      )}

      {post.comments.map((comment) => (
        <Comment key={comment.createdAt} comment={comment} />
      ))}
    </div>
  )
}
