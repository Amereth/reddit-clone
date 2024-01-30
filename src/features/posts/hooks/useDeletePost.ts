import {
  type MutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAuthenticatedFetch } from '~/hooks/useAuthenticatedFetch'
import { type Post, type WithSuccessResponse } from '~/types'

type SuccessResponse = WithSuccessResponse

export const useDeletePost = (
  props?: MutationOptions<SuccessResponse, Error, Post['_id']>,
) => {
  const fetch = useAuthenticatedFetch<SuccessResponse>()
  const client = useQueryClient()

  return useMutation({
    ...props,

    mutationFn: async (postId: Post['_id']) =>
      fetch(`/posts/${postId}`, { method: 'DELETE' }),

    onSuccess(data, variables, context) {
      toast.success('post deleted successfully')
      void client.invalidateQueries({ queryKey: ['posts'] })

      props?.onSuccess?.(data, variables, context)
    },

    onError(error, variables, context) {
      toast.error(error.message)

      props?.onError?.(error, variables, context)
    },
  })
}
