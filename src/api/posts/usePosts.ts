import { useQuery } from '@tanstack/react-query'
import { useAuthenticatedFetch } from '~/hooks/useAuthenticatedFetch'
import { type Post } from '~/types'

export const usePosts = () => {
  const fetch = useAuthenticatedFetch()

  return useQuery({
    queryKey: ['posts'],
    queryFn: async () =>
      fetch('/posts').then((r) => r.json() as Promise<Post[]>),
  })
}
