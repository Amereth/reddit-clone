import { Avatar, Button, Divider, Link } from '@nextui-org/react'
import NextLink from 'next/link'
import { useLikeDislikePost } from '~/api/posts/useLikeDislikePost'
import { ArrowIcon } from '~/icons/ArrowIcon'
import { type Post } from '~/types'
import { cn } from '~/utils/cn'

type PostCardProps = {
  post: Post
}

export const PostCard = ({ post }: PostCardProps) => {
  const { mutate } = useLikeDislikePost()

  const postHasTags = post.hashtags.length > 0

  return (
    <div className='relative rounded-xl border-1 hover:border-orange-400 hover:bg-gray-900 hover:opacity-90'>
      <NextLink
        href={`/posts/${post.id}`}
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
          <span>{post.likes.total}</span>
          <Button
            isIconOnly
            size='sm'
            className={cn(
              'h-4 w-4 min-w-0 rounded-full bg-transparent p-0 hover:text-orange-400',
              { 'text-orange-400': post.likes.isLiked },
            )}
            onClick={() => mutate({ postId: post.id, action: 'like' })}
          >
            <ArrowIcon className='h-4 w-4' />
          </Button>

          <span>|</span>

          <Button
            isIconOnly
            size='sm'
            className={cn(
              'h-4 w-4 min-w-0 rounded-full bg-transparent p-0 hover:text-orange-400',
              { 'text-orange-400': post.dislikes.isLiked },
            )}
            onClick={() => mutate({ postId: post.id, action: 'dislike' })}
          >
            <ArrowIcon className='h-4 w-4 rotate-180' />
          </Button>
          <span>{post.dislikes.total}</span>
        </footer>
      </div>
    </div>
  )
}
