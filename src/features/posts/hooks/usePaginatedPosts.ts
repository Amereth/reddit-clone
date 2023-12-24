import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useAuthenticatedFetch } from '~/hooks/useAuthenticatedFetch'
import { type WithTotal, type Post } from '~/types'

export type PostsQuery = {
  page?: string
  perPage?: string
  hashtag?: string
  date?: string
}

export type UsePostsInitialData = WithTotal<Post[]>

export const usePaginatedPosts = (initialData?: UsePostsInitialData) => {
  const fetch = useAuthenticatedFetch()
  const routerQuery = useRouter().query as PostsQuery
  const { page = '1', perPage = '3' } = routerQuery

  const query: PostsQuery = {
    ...routerQuery,
    page,
    perPage,
  }

  const params = new URLSearchParams(query).toString()

  return useQuery({
    queryKey: ['posts', params],
    queryFn: async () =>
      fetch(`/posts?${params}`) as Promise<WithTotal<Post[]>>,
    initialData,
  })
}
