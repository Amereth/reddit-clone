import { usePosts } from '~/api/posts/usePosts'
import { PostCard } from '~/components/PostCard'

export default function Home() {
  const { data: posts } = usePosts()

  return (
    <div className='grid grid-cols-3 gap-8'>
      {posts?.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  )
}
