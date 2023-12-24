import { useRouter } from 'next/router'
import { toast } from 'sonner'
import { useCreatePost } from '~/api/posts/useCreatePost'
import { EditPostForm } from '~/components/EditPostForm'

export default function CreatePostPage() {
  const router = useRouter()
  const { mutate, isPending } = useCreatePost({
    onSuccess() {
      void router.push('/')
    },

    onError(error) {
      toast.error(error.message)
    },
  })

  return <EditPostForm onSubmit={mutate} isLoadingSubmit={isPending} />
}
