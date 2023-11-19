import router from 'next/router'
import { useCreatePost } from '~/api/posts/useCreatePost'
import { EditPostForm } from '~/components/EditPostForm'

export default function CreatePostPage() {
  const { mutate, isPending } = useCreatePost({
    onSuccess() {
      void router.push('/')
    },
  })

  return <EditPostForm onSubmit={mutate} isLoadingSubmit={isPending} />
}
