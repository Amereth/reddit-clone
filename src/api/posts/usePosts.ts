import { useQuery } from '@tanstack/react-query'
import { useAuthenticatedFetch } from '~/hooks/useAuthenticatedFetch'
import { type Post } from '~/types'

export const usePosts = (hashtag = '', initialData?: Post[]) => {
  const fetch = useAuthenticatedFetch()

  const params = new URLSearchParams()
  params.append('hashtag', hashtag)

  return useQuery({
    queryKey: ['posts', hashtag],
    queryFn: async () =>
      fetch(`/posts?${params.toString()}`) as Promise<Post[]>,
    initialData,
  })
}
