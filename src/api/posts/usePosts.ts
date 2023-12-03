import { useQuery } from '@tanstack/react-query'
import { useAuthenticatedFetch } from '~/hooks/useAuthenticatedFetch'
import { type Post } from '~/types'

export const usePosts = (query = '', initialData?: Post[]) => {
  const fetch = useAuthenticatedFetch()

  return useQuery({
    queryKey: ['posts', query],
    queryFn: async () => fetch(`/posts?${query}`) as Promise<Post[]>,
    initialData,
  })
}
