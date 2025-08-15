'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useRef } from 'react'

import { ListingContainer } from '@/components/listingContainer/ListingContainer'
import { TileCard } from '@/components/titleCards/TileCard'
import { Heading } from '@/components/ui/heading/Heading'

import { useEffectScroll } from '@/hooks/useEffectScroll'

import { mangaService } from '@/services/manga.service'

export default function TitlesPage() {
	const scrollContainerRef = useRef<HTMLDivElement>(null)
	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, error, isError } =
		useInfiniteQuery({
			queryKey: ['allManga'],
			queryFn: async ({ pageParam = 0 }) => {
				const limit = 18
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
		isFetchingNextPage,
		scrollElementRef:
			typeof document !== 'undefined'
				? ({
						current: document.getElementById('main-scroll-container')
					} as React.RefObject<HTMLElement | null>)
				: undefined
	})

	if (isLoading) return <div>Загрузка...</div>
	if (isError) return <div>Ошибка: {error?.message}</div>

	// titles
	const allTitles = data?.pages.flatMap(page => page.data) || []
	console.log(allTitles)

	return (
		<div>
			<Heading isH1>Расширенный поиск</Heading>
			<ListingContainer ref={scrollContainerRef}>
				{allTitles.map((title, index) => (
					<TileCard
						key={index}
						attributes={title.attributes}
						id={title.id}
						relationships={title.relationships}
					/>
				))}
			</ListingContainer>
		</div>
	)
}
