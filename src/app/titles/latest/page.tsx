'use client'

import { useState } from 'react'

import { ChaptersCard } from '@/components/titleCards/ChaptersCard'
import { Heading } from '@/components/ui/heading/Heading'
import { SkeletonLoader } from '@/components/ui/skeletonLoader/SkeletonLoader'

import { useEffectScroll } from '@/hooks/useEffectScroll'
import { useLatestUpdates } from '@/hooks/useLatestUpdates'

export default function LatestUpdatesPage() {
	const [displayMode, setDisplayMode] = useState<'tiles' | 'grid'>('tiles')
	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, isError } =
		useLatestUpdates()

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
				<Heading isH1>Последние обновления</Heading>
			</div>
			{!isLoading ? (
				<div className='flex flex-col gap-[1rem]'>
					{allTitles.map((title, index) => (
						<div
							key={index}
							className='bg-primary p-[1rem] rounded'
						>
							<ChaptersCard
								attributes={title.attributes}
								id={title.id}
								relationships={title.relationships}
								chaptersLength={5}
								className='h-[12rem] grid-cols-[0.1fr_2fr]'
							/>
						</div>
					))}
				</div>
			) : (
				<div className='flex flex-col gap-[.5rem]'>
					<SkeletonLoader
						count={6}
						className='h-[13rem]'
					/>
				</div>
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
