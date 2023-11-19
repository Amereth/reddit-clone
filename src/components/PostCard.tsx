import { Avatar, Divider, Link } from '@nextui-org/react'
import NextLink from 'next/link'
import { type Post } from '~/types'
import { cn } from '~/utils/cn'
import { PostLikeControls } from './PostLikeControls'

type PostCardProps = {
  post: Post
}

export const PostCard = ({ post }: PostCardProps) => {
  const postHasTags = post.hashtags.length > 0

  return (
    <div className='relative rounded-xl border-1 hover:border-orange-400 hover:bg-gray-900 hover:opacity-90'>
      <NextLink
        href={`/post/${post.id}`}
        className='absolute left-0 top-0 z-10 h-full w-full rounded-xl'
      />

      <div className='relative flex h-full flex-col gap-4 rounded-xl p-4'>
        <div className='flex flex-col gap-4'>
          <header className='flex items-center gap-4'>
            {post.author.imageUrl && (
              <Avatar
                src={post.author.imageUrl}
                className='min-w-min shrink-0 self-start'
              />
            )}
            <h2 className='line-clamp-2'>{post.title}</h2>
          </header>
        </div>

        <Divider />

        <p
          className={cn(
            'mb-auto',
            postHasTags ? 'line-clamp-5' : 'line-clamp-[8]',
          )}
        >
          {post.body}
        </p>

        {postHasTags && (
          <>
            <Divider />
            <div className='relative z-20 flex flex-wrap gap-4'>
              {post.hashtags.map((tag) => (
                <NextLink key={tag} href={`/?tag=${tag}`} passHref>
                  <Link>#{tag}</Link>
                </NextLink>
              ))}
            </div>
          </>
        )}

        <Divider />

        <footer className='relative z-20 flex items-center gap-2'>
          <PostLikeControls post={post} />
        </footer>
      </div>
    </div>
  )
}
