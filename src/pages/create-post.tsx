import { DevTool } from '@hookform/devtools'
import { Button, Input, Textarea, Chip } from '@nextui-org/react'
import { xor } from 'lodash'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  useCreatePost,
  type CreatePostPayload,
} from '~/api/posts/useCreatePost'

type FormValues = CreatePostPayload

export default function CreatePostPage() {
  const router = useRouter()

  const { mutate, isPending } = useCreatePost({
    onSuccess() {
      void router.push('/')
    },
  })

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      title: '',
      body: '',
      hashtags: [],
    },
  })

  const [hashtagInputValue, setHashtagInputValue] = useState('')

  const hashtags = watch('hashtags')

  return (
    <div>
      <form
        className='mx-auto flex max-w-xl flex-col items-center gap-8'
        onSubmit={handleSubmit((values) => mutate(values))}
      >
        <Input
          label='title'
          variant='underlined'
          isInvalid={!!errors.title}
          errorMessage={errors.title?.message}
          {...register('title', {
            required: 'post title is required',
            minLength: {
              value: 3,
              message: 'post title should be at least 3 characters long',
            },
          })}
        />

        <Textarea
          variant='bordered'
          isInvalid={!!errors.body}
          errorMessage={errors.body?.message}
          {...register('body', {
            required: 'post body is required',
            minLength: {
              value: 10,
              message: 'post body should be at least 10 characters long',
            },
          })}
        />

        <div className='flex w-full items-end justify-center gap-8'>
          <Input
            label='#'
            variant='underlined'
            value={hashtagInputValue}
            onChange={(e) => setHashtagInputValue(e.target.value)}
            className='w-1/2'
          />

          <Button
            onClick={() => {
              if (!hashtags.includes(hashtagInputValue)) {
                setValue('hashtags', [...hashtags, hashtagInputValue])
              }
              setHashtagInputValue('')
            }}
          >
            add #
          </Button>
        </div>

        <div className='flex w-full flex-wrap justify-start gap-4'>
          {hashtags.map((hashtag) => (
            <Chip
              color='warning'
              variant='flat'
              key={hashtag}
              size='lg'
              onClose={() => setValue('hashtags', xor(hashtags, [hashtag]))}
            >
              {hashtag}
            </Chip>
          ))}
        </div>

        <div className='mt-8 flex gap-10'>
          <Button
            size='lg'
            type='reset'
            variant='bordered'
            onClick={() => router.push('/')}
          >
            cancel
          </Button>
          <Button
            size='lg'
            type='submit'
            className='w-min'
            isLoading={isPending}
          >
            submit
          </Button>
        </div>

        <DevTool control={control} />
      </form>
    </div>
  )
}
