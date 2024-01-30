import {
  type MutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useAuthenticatedFetch } from '~/hooks/useAuthenticatedFetch'
import { type WithSuccessResponse, type Post } from '~/types'

export type LikeOrDislikeAction = 'like' | 'dislike'

type LikeDislikePostPayload = {
  action: LikeOrDislikeAction
  postId: Post['_id']
}

export const useLikeDislikePost = (
  props?: MutationOptions<
    WithSuccessResponse,
    Error,
    LikeDislikePostPayload,
    unknown
  >,
) => {
  const fetch = useAuthenticatedFetch<WithSuccessResponse>()
  const client = useQueryClient()

  return useMutation({
    ...props,

    mutationFn: async ({ action, postId }: LikeDislikePostPayload) =>
      fetch(`/posts/${postId}/${action}`, {
        method: 'PUT',
      }),

    onSuccess(data, variables, context) {
      void client.invalidateQueries({ queryKey: ['posts'] })

      props?.onSuccess?.(data, variables, context)
    },
  })
}
