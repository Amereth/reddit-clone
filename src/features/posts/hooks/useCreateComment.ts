import {
  type MutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAuthenticatedFetch } from '~/hooks/useAuthenticatedFetch'
import { type Post, type PostComment, type WithSuccessResponse } from '~/types'

type Payload = {
  postId: Post['id']
  comment: Pick<PostComment, 'body'>
}

type SuccessResponse = WithSuccessResponse

export const useCreateComment = (
  options?: MutationOptions<SuccessResponse, Error, Payload>,
) => {
  const fetch = useAuthenticatedFetch<SuccessResponse>()
  const client = useQueryClient()

  return useMutation({
    mutationFn: async ({ postId, comment }: Payload) =>
      fetch(`/posts/${postId}/comment`, {
        method: 'POST',
        body: JSON.stringify(comment),
      }),

    onSuccess(data, variables, context) {
      toast.success('post created successfully')
      void client.invalidateQueries({ queryKey: ['posts'] })

      options?.onSuccess?.(data, variables, context)
    },
  })
}
