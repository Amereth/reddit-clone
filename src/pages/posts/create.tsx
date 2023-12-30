import { useRouter } from 'next/router'
import { toast } from 'sonner'
import { EditPostForm } from '~/features/posts/components/EditPostForm'
import { useCreatePost } from '~/features/posts/hooks/useCreatePost'

export default function CreatePostPage() {
  const router = useRouter()
  const { mutate, isPending } = useCreatePost({
    onSuccess() {
      void router.push('/')
    },

    onError(error) {
      console.error(error)
      toast.error(error.message)
    },
  })

  return <EditPostForm onSubmit={mutate} isSubmitting={isPending} />
}
