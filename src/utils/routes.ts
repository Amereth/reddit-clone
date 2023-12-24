const postsRoutes = {
  base: '/posts',

  byId(postId: string) {
    return `${this.base}/${postId}` as const
  },

  get create() {
    return `${this.base}/create` as const
  },

  edit(postId: string) {
    return `${this.byId(postId)}/edit` as const
  },

  comments(postId: string) {
    return `${this.byId(postId)}/comments` as const
  },
}

export const routes = {
  home: '/',
  chat: '/chat',
  posts: postsRoutes,
} as const
