'use client'

import { useState } from 'react'

import { ListingContainer } from '@/components/listingContainer/ListingContainer'
import { ChaptersCard } from '@/components/titleCards/ChaptersCard'
import { Heading } from '@/components/ui/heading/Heading'
import { SkeletonLoader } from '@/components/ui/skeletonLoader/SkeletonLoader'

import { useEffectScroll } from '@/hooks/useEffectScroll'
import { useLatestUpdates } from '@/hooks/useLatestUpdates'
import { usePopularRuManga } from '@/hooks/usePopularRuManga'
import { TileCard } from '@/components/titleCards/TileCard'
import { GridCard } from '@/components/titleCards/GridCard'

export default function PopularPage() {
	const [displayMode, setDisplayMode] = useState<'tiles' | 'grid'>('tiles')
	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, isError } =
		usePopularRuManga()

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
		<section className='px-[1.5rem] mt-[6rem] pb-[2rem]'>
			<div>
				<Heading isH1>Популярная манга на русском 🇷🇺</Heading>
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
