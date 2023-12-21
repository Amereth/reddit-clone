import { env } from '~/env.mjs'

export const apiUrl = (path: string) => env.NEXT_PUBLIC_API_URL + path
