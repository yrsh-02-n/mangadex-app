'use client'

import { useState } from 'react'

import { ListingContainer } from '@/components/listingContainer/ListingContainer'
import { GridCard } from '@/components/titleCards/GridCard'
import { TileCard } from '@/components/titleCards/TileCard'
import { Heading } from '@/components/ui/heading/Heading'
import { SkeletonLoader } from '@/components/ui/skeletonLoader/SkeletonLoader'

import { useEffectScroll } from '@/hooks/useEffectScroll'
import { useSearchQuery } from '@/hooks/useSearchQuery'

import { DynamicSyncFiltersUrl } from '@/utils/syncfiltersUrl/DynamicSyncFiltersUrl'

import { DynSearchBlock } from './searchBlock/DynamicSearchBlock'

export default function TitlesPage() {
	const [displayMode, setDisplayMode] = useState<'tiles' | 'grid'>('tiles')

	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, isError } =
		useSearchQuery()

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
				<DynamicSyncFiltersUrl />
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
			{allTitles.length === 0 && (
				<div className='flex flex-col items-center justify-center h-full'>
					<p className='text-xl'>По вашему запросу ничего не найдено.</p>
					<p>Попробуйте применить другие параметры.</p>
				</div>
			)}
		</section>
	)
}
