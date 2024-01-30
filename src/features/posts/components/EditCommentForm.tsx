import { Button, Textarea } from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'
import { type PostComment } from '~/types'

export type CommentFormModel = Pick<PostComment, 'body'>

export type CommentFormProps = {
  onSubmit: (data: CommentFormModel) => void
  onCancel: () => void
  isSubmitting: boolean
  defaultValues?: CommentFormModel
}

export const EditCommentForm = ({
  onSubmit,
  onCancel,
  defaultValues,
  isSubmitting,
}: CommentFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CommentFormModel>({
    defaultValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
      <Controller
        control={control}
        name='body'
        rules={{ required: 'enter something' }}
        render={({ field }) => (
          <Textarea
            variant='bordered'
            isInvalid={!!errors.body}
            errorMessage={errors.body?.message}
            {...field}
          />
        )}
      />

      <div className='flex gap-2'>
        <Button
          size='md'
          type='reset'
          className='ml-auto mt-2 block w-min'
          onClick={onCancel}
        >
          cancel
        </Button>

        <Button
          size='md'
          type='submit'
          className='mt-2 block w-min'
          isLoading={isSubmitting}
        >
          {!isSubmitting && 'submit'}
        </Button>
      </div>
    </form>
  )
}
