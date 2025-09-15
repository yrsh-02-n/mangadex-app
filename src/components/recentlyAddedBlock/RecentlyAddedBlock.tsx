'use client'

import { SplideSlide } from '@splidejs/react-splide'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

import { useEffectScroll } from '@/hooks/useEffectScroll'
import { useRecentlyAddedManga } from '@/hooks/useRecentlyAddedManga'

import { getCoverArt } from '@/utils/getCoverArt'

import { FullWidthSliderCard } from '../titleCards/FullWidthSliderCard'
import { SkeletonLoader } from '../ui/skeletonLoader/SkeletonLoader'
import { SplideSlider } from '../ui/slider/SplideSlider'

export function RecentlyAddedBlock() {
	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, isError } =
		useRecentlyAddedManga()
	const [activeIndex, setActiveIndex] = useState<number>(0)
	const allTitles = useMemo(() => {
		return data?.pages.flatMap(page => page.data) || []
	}, [data])

	useEffect(() => {
		if (allTitles.length > 0 && activeIndex >= allTitles.length) {
			setActiveIndex(0)
		}
	}, [allTitles.length, activeIndex])

	const activeTitle = useMemo(() => {
		if (allTitles.length === 0) return undefined
		const index = Math.max(0, Math.min(activeIndex, allTitles.length - 1))
		return allTitles[index]
	}, [allTitles, activeIndex])

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

	return (
		<>
			{isLoading && (
				<SkeletonLoader
					count={1}
					className='absolute top-0 w-full h-[32rem] right-0 z-[-1] max-lg:h-[34rem]'
				/>
			)}
			<div className='w-full'>
				<div className='absolute top-0 w-full h-[32rem] right-0 z-[-1] max-lg:h-[34rem]'>
					<Image
						src={getCoverArt(activeTitle?.relationships, activeTitle?.id) || ''}
						alt='Background'
						fill
						style={{
							transition: 'filter 0.2s ease',
							objectPosition: 'center 40%',
							objectFit: 'cover',
							opacity: activeTitle ? 1 : 0
						}}
						priority
						quality={100}
					/>
					<div
						className='absolute inset-0'
						style={{
							background:
								'linear-gradient(to top, var(--bg), rgba(18, 18, 18, 0.9) 50%,  rgba(0,0,0,0) 100%)',
							transition: 'opacity 0.2s ease'
						}}
					/>
				</div>

				{allTitles.length > 0 ? (
					<div className='relative'>
						<SplideSlider
							slidesPerView={1}
							onSlideChange={index => {
								const validIndex = Math.max(0, Math.min(index, allTitles.length - 1))
								setActiveIndex(validIndex)
							}}
							autoplay
							arrows={false}
							pagination={false}
							sliderBtnStyles='max-lg:top-[-0.2rem] max-sm:top-[0.3rem]'
						>
							{allTitles.slice(0, 10).map(title => (
								<SplideSlide key={title.id}>
									<FullWidthSliderCard {...title} />
								</SplideSlide>
							))}
						</SplideSlider>
					</div>
				) : (
					<div className='h-64 flex items-center justify-center'>
						{isLoading ? 'Загрузка...' : 'Нет данных'}
					</div>
				)}
			</div>
		</>
	)
}
