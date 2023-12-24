import { useRouter } from 'next/router'
import {
  EditPostForm,
  type EditPostFormProps,
} from '~/features/posts/components/EditPostForm'
import { useEditPost } from '~/features/posts/hooks/useEditPost'
import { usePost } from '~/features/posts/hooks/usePost'

export default function EditPostPage() {
  const router = useRouter()
  const postId = router.query.postId as string

  const { data: post, isLoading } = usePost(postId)

  const { mutate, isPending } = useEditPost(postId, {
    onSuccess() {
      void router.push('/')
    },
  })

  const defaultValues: EditPostFormProps['defaultValues'] = post && {
    title: post?.title,
    body: post?.body,
    hashtags: post?.hashtags,
  }

  if (isLoading) return null

  return (
    <EditPostForm
      onSubmit={mutate}
      isLoadingSubmit={isPending}
      defaultValues={defaultValues}
    />
  )
}
