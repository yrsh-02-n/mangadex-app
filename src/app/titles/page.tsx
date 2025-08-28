'use client'

import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { ListingContainer } from '@/components/listingContainer/ListingContainer'
import { GridCard } from '@/components/titleCards/GridCard'
import { TileCard } from '@/components/titleCards/TileCard'
import { Heading } from '@/components/ui/heading/Heading'
import { SkeletonLoader } from '@/components/ui/skeletonLoader/SkeletonLoader'

import { useSearchStore } from '@/store/search.store'

import { useEffectScroll } from '@/hooks/useEffectScroll'

import { SyncFiltersUrl } from '@/utils/syncFiltersUrl'

import { DynSearchBlock } from './searchBlock/DynamicSearchBlock'
import { mangaService } from '@/services/manga.service'
import { MangaListResponse } from '@/types/api.types'

export default function TitlesPage() {
	const [displayMode, setDisplayMode] = useState<'tiles' | 'grid'>('tiles')
	const currentFilters = useSearchStore()

	type QueryKey = readonly ['searchManga', string[], string[]]

	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, isError } =
		useInfiniteQuery<
			MangaListResponse,
			Error,
			InfiniteData<MangaListResponse, number>,
			QueryKey,
			number
		>({
			queryKey: [
				'searchManga',
				currentFilters.appliedDemographics,
				currentFilters.appliedOriginalLangs
			],
			queryFn: async ({ pageParam = 0, queryKey }) => {
				const limit = 18

				const [, appliedDemosAtQueryTime, appliedOriginLangs] = queryKey

				const searchParams = {
					publicationDemographic: appliedDemosAtQueryTime,
					originalLanguage: appliedOriginLangs
				}
				const paginationParams: { limit: number; offset: number } = {
					limit,
					offset: pageParam
				}
				const response = await mangaService.getBySearchParams(searchParams, paginationParams)
				return response.data // check data
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

	// titles
	const allTitles = data?.pages.flatMap(page => page.data) || []

	return (
		<section>
			<div>
				<Heading isH1>Расширенный поиск</Heading>
				<SyncFiltersUrl />
				<DynSearchBlock data={data} />
			</div>
			{!isLoading ? (
				<ListingContainer
					onModeChange={setDisplayMode}
					displayMode={displayMode}
				>
					{displayMode === 'tiles'
						? allTitles.map((title, index) => (
								<TileCard
									key={index}
									attributes={title.attributes}
									id={title.id}
									relationships={title.relationships}
								/>
							))
						: allTitles.map((title, index) => (
								<GridCard
									key={index}
									attributes={title.attributes}
									id={title.id}
									relationships={title.relationships}
								/>
							))}
				</ListingContainer>
			) : (
				<ListingContainer
					onModeChange={setDisplayMode}
					displayMode={displayMode}
				>
					<SkeletonLoader
						count={18}
						className='h-[22rem]'
					/>
				</ListingContainer>
			)}
			{isError && (
				<div className='flex flex-col items-center'>
					<p className='text-xl'>Ничего не загрузилось.</p>
					<p>Попробуйте обновить страницу.</p>
				</div>
			)}
		</section>
	)
}
