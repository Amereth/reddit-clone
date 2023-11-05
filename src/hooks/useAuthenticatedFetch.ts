import { useAuth } from '@clerk/nextjs'

const methodsWithBody = ['POST', 'PUT', 'PATCH']
const apiUrl = 'http://localhost:8080'

export const useAuthenticatedFetch = () => {
  const { getToken } = useAuth()

  return async (input: string, init: RequestInit | undefined = {}) => {
    const headers = init?.headers ?? {}

    const contentType = methodsWithBody.includes(init.method ?? 'GET')
      ? 'application/json'
      : ''

    const modifiedInit: RequestInit = {
      ...init,
      headers: {
        authorization: `Bearer ${await getToken()}`,
        'content-type': contentType,
        ...headers,
      },
    }

    return fetch(apiUrl + input, modifiedInit)
  }
}
