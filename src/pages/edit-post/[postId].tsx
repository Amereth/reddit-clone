import { useRouter } from 'next/router'
import { useEditPost } from '~/api/posts/useEditPost'
import { usePost } from '~/api/posts/usePost'
import { EditPostForm, type EditPostFormProps } from '~/components/EditPostForm'

export default function EditPostPage() {
  const router = useRouter()
  const { postId } = router.query as { postId: string }

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
