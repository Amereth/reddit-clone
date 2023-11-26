import {
  type MutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { toast } from 'sonner'
import { type EditPotFormModel } from '~/components/EditPostForm'
import { useAuthenticatedFetch } from '~/hooks/useAuthenticatedFetch'
import { type WithSuccessResponse } from '~/types'

export type CreatePostPayload = EditPotFormModel

type SuccessResponse = WithSuccessResponse<{ insertedId: string }>

export const useCreatePost = (
  props?: MutationOptions<SuccessResponse, Error, CreatePostPayload, unknown>,
) => {
  const fetch = useAuthenticatedFetch<SuccessResponse>()
  const client = useQueryClient()

  return useMutation({
    ...props,

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

      props?.onSuccess?.(data, variables, context)
    },
  })
}
