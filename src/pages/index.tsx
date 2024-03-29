import { Spinner } from '@nextui-org/react'
import {
  type GetServerSidePropsResult,
  type GetServerSidePropsContext,
} from 'next'
import { toast } from 'sonner'
import { Pagination } from '~/components/Pagination'
import { PostCard } from '~/features/posts/components/PostCard'
import {
  type PostsQuery,
  usePaginatedPosts,
  type UsePostsInitialData,
} from '~/features/posts/hooks/usePaginatedPosts'
import { apiUrl } from '~/utils/apiUrl'

type Props = {
  initialData?: UsePostsInitialData
}

export default function Home({ initialData }: Props) {
  const { data, isLoading, error } = usePaginatedPosts(initialData)

  if (error) {
    toast.error(error.message)
    return null
  }

  if (isLoading || !data) return <Spinner />

  const { data: posts, total, perPage } = data

  const totalPages = Math.ceil(total / perPage)

  return (
    <div className='flex flex-col items-center gap-4'>
      <Pagination totalPages={totalPages} />

      <div className='grid w-full grid-cols-1 gap-4 max-lg:max-w-2xl lg:grid-cols-3 lg:gap-8'>
        {posts?.map((post) => <PostCard key={post._id} post={post} />)}
      </div>
    </div>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<Props>> => {
  const params = new URLSearchParams(context.query as PostsQuery)

  const response = await fetch(apiUrl(`/posts?${params.toString()}`))

  if (!response.ok) return { props: { initialData: undefined } }

  const data = (await response.json()) as UsePostsInitialData
  return { props: { initialData: data } }
}
