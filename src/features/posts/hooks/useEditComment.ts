import {
  type MutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAuthenticatedFetch } from '~/hooks/useAuthenticatedFetch'
import { type PostComment, type Post, type WithSuccessResponse } from '~/types'

export type EditCommentPayload = {
  commentId: PostComment['_id']
  body: PostComment['body']
  postId: Post['_id']
}

type SuccessResponse = WithSuccessResponse

export const useEditComment = (
  props?: MutationOptions<
    SuccessResponse,
    unknown,
    EditCommentPayload,
    unknown
  >,
) => {
  const fetch = useAuthenticatedFetch<SuccessResponse>()
  const client = useQueryClient()

  return useMutation({
    ...props,

    mutationFn: async ({ postId, commentId, body }: EditCommentPayload) =>
      fetch(`/posts/${postId}/comments/${commentId}`, {
        method: 'PATCH',
        body: JSON.stringify({ body }),
      }),

    onSuccess(data, variables, context) {
      toast.success('comment updated successfully')
      void client.invalidateQueries({ queryKey: ['posts'] })

      props?.onSuccess?.(data, variables, context)
    },
  })
}
