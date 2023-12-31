export type Author = {
  userId: string
  firstName: string | null
  lastName: string | null
  imageUrl: string | null
}

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
}

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
