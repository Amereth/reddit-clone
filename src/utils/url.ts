import { env } from '~/env.mjs'

export const url = (path: string) => env.NEXT_PUBLIC_API_URL + path
