import {
  type MutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAuthenticatedFetch } from '~/hooks/useAuthenticatedFetch'
import { type SuccessResponse, type Post } from '~/types'

export type CreatePostPayload = Post

export const useCreatePost = (
  props?: MutationOptions<SuccessResponse, Error, CreatePostPayload, unknown>,
) => {
  const fetch = useAuthenticatedFetch()
  const client = useQueryClient()

  return useMutation({
    ...props,

    mutationFn: async (values: CreatePostPayload) =>
      fetch('/posts', {
        method: 'POST',
        body: JSON.stringify(values),
      }).then((r) => r.json() as Promise<SuccessResponse>),

    onSuccess(data, variables, context) {
      toast.success('post created successfully')
      void client.invalidateQueries({ queryKey: ['posts'] })

      props?.onSuccess?.(data, variables, context)
    },
  })
}
