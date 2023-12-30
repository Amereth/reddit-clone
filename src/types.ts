import { z } from 'zod'

export type Post = {
  id: string
  createdAt: string
  updatedAt: string
  title: string
  body: string
  hashtags: string[]
  author: Author
  imageUrl: string
  likes: {
    total: number
    isLiked: boolean
  }
  dislikes: {
    total: number
    isLiked: boolean
  }
  comments: PostComment[]
}

const author = z.object({
  userId: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  imageUrl: z.string().nullable(),
})

type Author = z.infer<typeof author>

export const postComment = z.object({
  body: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
  likes: z.array(z.string()).default([]),
  dislikes: z.array(z.string()).default([]),
  author,
})

export type PostComment = z.infer<typeof postComment>

export type WithSuccessResponse<T = unknown> = T & {
  acknowledged: boolean
  matchedCount: number
  modifiedCount: number
  upsertedCount: number
  upsertedId: string | null
}

export type WithTotal<T = unknown> = T & {
  data: T
  total: number
  perPage: number
}
