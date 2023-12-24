import { useQuery } from '@tanstack/react-query'
import { useAuthenticatedFetch } from '~/hooks/useAuthenticatedFetch'
import { type Post } from '~/types'

export const usePost = (id: Post['id']) => {
  const fetch = useAuthenticatedFetch()

  return useQuery({
    queryKey: ['posts', id],
    queryFn: async () => fetch(`/posts/${id}`) as Promise<Post>,
    enabled: !!id,
  })
}
