import {
  type MutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { toast } from 'sonner'
import { type EditPostFormModel } from '~/features/posts/components/EditPostForm'
import { useAuthenticatedFetch } from '~/hooks/useAuthenticatedFetch'
import { type WithSuccessResponse } from '~/types'

export type CreatePostPayload = EditPostFormModel

type SuccessResponse = WithSuccessResponse<{ insertedId: string }>

export const useCreatePost = (
  options?: MutationOptions<SuccessResponse, Error, CreatePostPayload>,
) => {
  const fetch = useAuthenticatedFetch<SuccessResponse>()
  const client = useQueryClient()

  return useMutation({
    ...options,

    mutationFn: async (values: CreatePostPayload) => {
      if (!values.image) {
        return fetch('/posts', {
          method: 'POST',
          body: JSON.stringify(values),
        })
      }

      const formData = new FormData()

      formData.append('title', values.title)
      formData.append('body', values.body)
      formData.append('image', values.image)
      values.hashtags.forEach((hashtag) => formData.append('hashtags', hashtag))

      return fetch('/posts', {
        method: 'POST',
        body: formData,
      })
    },

    onSuccess(data, variables, context) {
      toast.success('post created successfully')
      void client.invalidateQueries({ queryKey: ['posts'] })

      options?.onSuccess?.(data, variables, context)
    },
  })
}
