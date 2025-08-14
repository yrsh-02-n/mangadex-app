'use client'

import { useInfiniteQuery } from '@tanstack/react-query'

import { Heading } from '@/components/ui/heading/Heading'

import { mangaService } from '@/services/manga.service'
import { useEffectScroll } from '@/hooks/useEffectScroll'

export default function TitlesPage() {
	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, error, isError } =
		useInfiniteQuery({
			queryKey: ['allManga'],
			queryFn: async ({ pageParam = 0 }) => {
				const limit = 20
				const response = await mangaService.getAll({
					limit,
					offset: pageParam
				})
				return response.data // check I have data
			},
			getNextPageParam: (lastPage, allPages) => {
				// check if there is still data or not
				const totalLoaded = allPages.reduce((sum, page) => sum + page.data.length, 0)
				if (totalLoaded < lastPage.total) {
					return totalLoaded // or lastPage.offset + lastPage.limit
				}
				return undefined // if pages are gone
			},
			initialPageParam: 0
		})

	useEffectScroll({
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage
	})

	if (isLoading) return <div>Загрузка...</div>
	if (isError) return <div>Ошибка: {error?.message}</div>

  // titles
  const allTitles = data?.pages.flatMap(page => page.data) || []
  console.log(allTitles);
  

	return (
		<>
			<Heading isH1>Расширенный поиск</Heading>
		</>
	)
}
