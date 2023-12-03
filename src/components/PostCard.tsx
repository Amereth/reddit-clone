import { Avatar, Divider, Link } from '@nextui-org/react'
import dayjs from 'dayjs'
import NextLink from 'next/link'
import { type Post } from '~/types'
import { cn } from '~/utils/cn'
import { PostControls } from './PostControls'

type PostCardProps = {
  post: Post
}

export const PostCard = ({ post }: PostCardProps) => {
  const postHasTags = post.hashtags.length > 0

  const utcDate = dayjs.utc(post.createdAt)
  const linkDate = utcDate.format('YYYY-MM-DD')
  const localDate = utcDate.local().format('MMM D, YYYY HH:mm')

  return (
    <div className='relative rounded-xl border-1 hover:border-orange-400 hover:bg-gray-900 hover:opacity-90'>
      <NextLink
        href={`/post/${post.id}`}
        className='absolute left-0 top-0 z-10 h-full w-full rounded-xl'
      />

      <div className='relative flex h-full flex-col gap-2 rounded-xl px-4 py-2 lg:gap-4 lg:py-4'>
        <header className='flex items-center gap-4'>
          {post.author.imageUrl && (
            <Avatar
              src={post.author.imageUrl}
              className='min-w-min shrink-0 self-start'
            />
          )}
          <div className='flex grow flex-col gap-2'>
            <div className='text-xs'>
              <span className='mr-4'>{`${post.author.firstName} ${post.author.lastName}`}</span>{' '}
              <NextLink href={`/?date=${linkDate}`} passHref>
                <Link
                  as='span'
                  className='z-20 text-xs text-white sm:whitespace-nowrap'
                >
                  {localDate}
                </Link>
              </NextLink>
            </div>

            <h2 className='line-clamp-2'>{post.title}</h2>
          </div>
        </header>

        <Divider />

        <p
          className={cn(
            'mb-auto',
            postHasTags ? 'lg:line-clamp-5' : 'lg:line-clamp-[8]',
            'line-clamp-2',
          )}
        >
          {post.body}
        </p>

        {postHasTags && (
          <>
            <Divider />
            <div className='relative z-20 flex flex-wrap gap-4'>
              {post.hashtags.map((tag) => (
                <NextLink key={tag} href={`/?hashtag=${tag}`} passHref>
                  <Link as='span'>#{tag}</Link>
                </NextLink>
              ))}
            </div>
          </>
        )}

        <Divider />

        <footer className='relative z-20 flex items-center gap-2'>
          <PostControls post={post} />
        </footer>
      </div>
    </div>
  )
}
