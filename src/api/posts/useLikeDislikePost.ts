import {
  type MutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useAuthenticatedFetch } from '~/hooks/useAuthenticatedFetch'
import { type WithSuccessResponse, type Post } from '~/types'

type LikeDislikePostPayload = {
  action: 'like' | 'dislike'
  postId: Post['id']
}

export const useLikeDislikePost = (
  props?: MutationOptions<
    WithSuccessResponse,
    Error,
    LikeDislikePostPayload,
    unknown
  >,
) => {
  const fetch = useAuthenticatedFetch()
  const client = useQueryClient()

  return useMutation({
    ...props,

    mutationFn: async ({ action, postId }: LikeDislikePostPayload) =>
      fetch(`/posts/${postId}/${action}`, {
        method: 'PUT',
      }).then((r) => r.json() as Promise<WithSuccessResponse>),

    onSuccess(data, variables, context) {
      void client.invalidateQueries({ queryKey: ['posts'] })

      props?.onSuccess?.(data, variables, context)
    },
  })
}
