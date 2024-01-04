import { z } from 'zod'

const author = z.object({
  userId: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  imageUrl: z.string().nullable(),
})

export type Author = z.infer<typeof author>

export const postComment = z.object({
  body: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional().nullable().default(null),
  likes: z.number().default(0),
  dislikes: z.number().default(0),
  isLiked: z.boolean().default(false),
  isDisliked: z.boolean().default(false),
  author,
})

export type PostComment = z.infer<typeof postComment>

export const post = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  hashtags: z.array(z.string()).default([]),
  imageUrl: z.string().nullable().default(null),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional().nullable().default(null),
  likes: z.number().default(0),
  dislikes: z.number().default(0),
  isLiked: z.boolean().default(false),
  isDisliked: z.boolean().default(false),
  author,
  comments: z.array(postComment).default([]),
})

export type Post = z.infer<typeof post>

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
