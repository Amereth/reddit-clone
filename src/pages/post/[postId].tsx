import { User } from '@nextui-org/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { toast } from 'sonner'
import { usePost } from '~/api/posts/usePost'
import { PostLikeControls } from '~/components/PostLikeControls'
import { url } from '~/utils/url'

export default function PostPage() {
  const router = useRouter()
  const postId = router.query.postId as string

  const { data: post, error } = usePost(postId)

  if (error) {
    toast.error(error.message)
    void router.push('/')
    return null
  }

  if (!post) return null

  return (
    <div className='mx-auto flex max-w-xl flex-col items-start gap-6'>
      <User
        name={`${post?.author.firstName} ${post?.author.lastName}`}
        avatarProps={{ src: post?.author.imageUrl ?? '' }}
      />

      <h2 className='text-2xl'>{post?.title}</h2>

      {post.imageUrl && (
        <div className='relative w-full'>
          <Image
            src={url(post.imageUrl)}
            alt='post image'
            style={{
              width: '100%',
              height: 'auto',
            }}
            width={500}
            height={300}
          />
        </div>
      )}

      <p className='leading-relaxed'>{post?.body}</p>

      <footer className='mt-10 flex w-full items-center gap-2'>
        <PostLikeControls post={post} />
      </footer>
    </div>
  )
}
