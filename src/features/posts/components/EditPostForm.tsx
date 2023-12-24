import { DevTool } from '@hookform/devtools'
import { Textarea, Button, Chip, Input } from '@nextui-org/react'
import { xor } from 'lodash'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { type Post } from '~/types'
import { routes } from '~/utils/routes'

export type EditPostFormModel = Pick<Post, 'title' | 'body' | 'hashtags'> & {
  image?: File
}

export type EditPostFormProps = {
  onSubmit: (data: EditPostFormModel) => void
  isLoadingSubmit: boolean
  defaultValues?: EditPostFormModel
}

export const EditPostForm = ({
  onSubmit,
  isLoadingSubmit,
  defaultValues,
}: EditPostFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<EditPostFormModel>({
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
    <form
      className='mx-auto flex w-full max-w-xl flex-col items-center gap-8'
      onSubmit={handleSubmit((v) => onSubmit(v))}
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

      <Controller
        control={control}
        name='image'
        render={({ field: { value, onChange, ...field } }) => (
          <div className='flex items-center gap-4'>
            <Button onClick={() => inputRef.current?.click()}>
              choose image
            </Button>
            <span>{value?.name}</span>
            <input
              type='file'
              onChange={(e) => onChange(e.target.files?.[0])}
              {...field}
              ref={inputRef}
            />
          </div>
        )}
      />

      <div className='flex w-full max-w-sm items-end justify-center gap-8'>
        <Input
          label='#'
          variant='underlined'
          value={hashtagInputValue}
          onChange={(e) => setHashtagInputValue(e.target.value)}
          className='w-max flex-1'
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
        <Link href={routes.home}>
          <Button size='lg' type='reset' variant='bordered' as='span'>
            cancel
          </Button>
        </Link>

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
  )
}
