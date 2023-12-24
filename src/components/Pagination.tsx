import { Pagination as NextUiPagination } from '@nextui-org/react'
import { useRouter } from 'next/router'

type Props = {
  totalPages: number
}

export const Pagination = ({ totalPages }: Props) => {
  const router = useRouter()

  if (totalPages < 2) return null

  const page = Number(router.query.page) || 1

  const onPageChange = (page: number) => {
    void router.push({
      pathname: router.pathname,
      query: { ...router.query, page },
    })
  }

  return (
    <NextUiPagination
      variant='light'
      total={totalPages}
      size='sm'
      color='warning'
      showControls
      page={page}
      onChange={onPageChange}
    />
  )
}
