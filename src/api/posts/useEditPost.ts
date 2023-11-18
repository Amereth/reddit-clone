import {
  type MutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAuthenticatedFetch } from '~/hooks/useAuthenticatedFetch'
import { type Post, type WithSuccessResponse } from '~/types'
import { type CreatePostPayload } from './useCreatePost'

export type EditPostPayload = Partial<CreatePostPayload>

type SuccessResponse = WithSuccessResponse<{ insertedId: string }>

export const useEditPost = (
  postId: Post['id'],
  props?: MutationOptions<SuccessResponse, Error, EditPostPayload, unknown>,
) => {
  const fetch = useAuthenticatedFetch<SuccessResponse>()
  const client = useQueryClient()

  return useMutation({
    ...props,

    mutationFn: async (values: EditPostPayload) =>
      fetch(`/posts/${postId}`, {
        method: 'PATCH',
        body: JSON.stringify(values),
      }),

    onSuccess(data, variables, context) {
      toast.success('post updated successfully')
      void client.invalidateQueries({ queryKey: ['posts'] })

      props?.onSuccess?.(data, variables, context)
    },
  })
}
