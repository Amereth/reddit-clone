export type Post = {
  title: string
  body: string
  hashtags: string[]
}

export type SuccessResponse = {
  acknowledged: true
  insertedId: string
}
