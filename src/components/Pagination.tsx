import { Pagination as PaginationUi } from '@nextui-org/react'
import { useRouter } from 'next/router'

type Props = {
  totalPages: number
}

export const Pagination = ({ totalPages }: Props) => {
  const router = useRouter()

  const page = Number(router.query.page) || 1

  const onPageChange = (page: number) => {
    void router.push({
      pathname: router.pathname,
      query: { ...router.query, page },
    })
  }

  return (
    <PaginationUi
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
