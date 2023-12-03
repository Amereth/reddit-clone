import {
  type GetServerSidePropsResult,
  type GetServerSidePropsContext,
} from 'next'
import { useRouter } from 'next/router'
import { usePosts } from '~/api/posts/usePosts'
import { PostCard } from '~/components/PostCard'
import { type Post } from '~/types'
import { url } from '~/utils/url'

type Props = {
  initialData?: Post[]
}

export default function Home({ initialData }: Props) {
  const router = useRouter()

  const params = new URLSearchParams(router.query as Record<string, string>)
  const { data: posts } = usePosts(params.toString(), initialData)

  return (
    <div className='grid grid-cols-2 gap-8 lg:grid-cols-3'>
      {posts?.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<Props>> => {
  const params = new URLSearchParams(context.query as Record<string, string>)

  const response = await fetch(url(`/posts?${params.toString()}`))
  const data = (await response.json()) as Post[]

  if (response.ok) return { props: { initialData: data } }

  return { props: { initialData: undefined } }
}
