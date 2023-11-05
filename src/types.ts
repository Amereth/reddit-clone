export type Entity = {
  id: string
  createdAt: string
  updatedAt: string
}

export type Post = Entity & {
  title: string
  body: string
  hashtags: string[]
}

export type SuccessResponse = {
  acknowledged: true
  insertedId: string
}
