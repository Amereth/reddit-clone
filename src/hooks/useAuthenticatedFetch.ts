import { useAuth } from '@clerk/nextjs'
import { apiUrl } from '~/utils/apiUrl'

const methodsWithBody = ['POST', 'PUT', 'PATCH']

type ErrorResponse = {
  message: string
}

export const useAuthenticatedFetch = <TData>() => {
  const { getToken } = useAuth()

  return async (input: string, init: RequestInit | undefined = {}) => {
    const headers = init?.headers ?? {}

    const contentType =
      init.method && methodsWithBody.includes(init.method)
        ? 'application/json'
        : ''

    const isFormData = init.body instanceof FormData

    const modifiedInit: RequestInit = {
      ...init,
      headers: {
        authorization: `Bearer ${await getToken()}`,
        ...(isFormData ? {} : { 'content-type': contentType }),
        ...headers,
      },
    }

    return fetch(apiUrl(input), modifiedInit).then(async (response) => {
      const data = (await response.json()) as TData | ErrorResponse

      if (response.ok) {
        return data as TData
      }

      throw new Error((data as ErrorResponse).message)
    })
  }
}
