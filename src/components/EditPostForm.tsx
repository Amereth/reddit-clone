import { DevTool } from '@hookform/devtools'
import { Textarea, Button, Chip, Input } from '@nextui-org/react'
import { xor } from 'lodash'
import router from 'next/router'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { type Post } from '~/types'

type FormModel = Pick<Post, 'title' | 'body' | 'hashtags'>

export type EditPostFormProps = {
  onSubmit: (data: FormModel) => void
  isLoadingSubmit: boolean
  defaultValues?: FormModel
}

export const EditPostForm = ({
  onSubmit,
  isLoadingSubmit,
  defaultValues,
}: EditPostFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormModel>({
    defaultValues: {
      title: '',
      body: '',
      hashtags: [],
      ...defaultValues,
    },
  })

  const [hashtagInputValue, setHashtagInputValue] = useState('')

  const hashtags = watch('hashtags')

  return (
    <div>
      <form
        className='mx-auto flex max-w-xl flex-col items-center gap-8'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name='title'
          rules={{
            required: 'post title is required',
            minLength: {
              value: 3,
              message: 'post title should be at least 3 characters long',
            },
          }}
          render={({ field }) => (
            <Input
              label='title'
              variant='underlined'
              isInvalid={!!errors.title}
              errorMessage={errors.title?.message}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name='body'
          rules={{
            required: 'post body is required',
            minLength: {
              value: 10,
              message: 'post body should be at least 10 characters long',
            },
          }}
          render={({ field }) => (
            <Textarea
              variant='bordered'
              isInvalid={!!errors.body}
              errorMessage={errors.body?.message}
              {...field}
            />
          )}
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
              if (!hashtagInputValue) return
              if (hashtags.includes(hashtagInputValue)) return

              setValue('hashtags', [...hashtags, hashtagInputValue])
              setHashtagInputValue('')
            }}
          >
            add #
          </Button>
        </div>

        <div className='flex w-full flex-wrap justify-center gap-4'>
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
            isLoading={isLoadingSubmit}
          >
            submit
          </Button>
        </div>

        <DevTool control={control} />
      </form>
    </div>
  )
}
