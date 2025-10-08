'use client'

import { SplideSlide } from '@splidejs/react-splide'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

import { PUBLIC_ROUTES } from '@/config/public-routes.config'

import { useRecentlyAddedManga } from '@/hooks/useRecentlyAddedManga'

import { getCoverArt } from '@/utils/getCoverArt'

import { FullWidthSliderCard } from '../titleCards/FullWidthSliderCard'
import { ArrowButton } from '../ui/button/ArrowButton'
import { Heading } from '../ui/heading/Heading'
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

	return (
		<>
			{isLoading && (
				<SkeletonLoader
					count={1}
					className='top-0 w-full h-[32rem] right-0 z-[-1] max-lg:h-[34rem]'
				/>
			)}
			<div className='w-full relative px-[1.5rem]'>
				<div className='absolute z-[-1] w-full h-[32rem] right-0 max-lg:h-[34rem] blur-md'>
					<Image
						src={getCoverArt(activeTitle?.relationships, activeTitle?.id) || ''}
						alt='Background'
						fill
						style={{
							transition: 'filter 0.2s ease',
							objectPosition: 'center 20%',
							objectFit: 'cover',
							opacity: activeTitle ? 1 : 0
						}}
						priority
            unoptimized

					/>
					<div
						className='absolute inset-0'
						style={{
							background:
								'linear-gradient(to top, var(--bg), rgba(18, 18, 18, 0.8) 50%, rgba(0,0,0,0) 100%)',
							transition: 'opacity 0.2s ease'
						}}
					/>
				</div>

				<div className='flex items-center gap-[.5rem] mb-[2rem] pt-[6rem]'>
					<Heading
						className='mb-0 text-shadow-lg'
						isH1
					>
						Недавно добавленные
					</Heading>
					<ArrowButton link={PUBLIC_ROUTES.RECENTLY} />
				</div>

				{allTitles.length > 0 && (
					<div className='relative'>
						<SplideSlider
							slidesPerView={1}
							type={'fade'}
							onSlideChange={index => {
								const validIndex = Math.max(0, Math.min(index, allTitles.length - 1))
								setActiveIndex(validIndex)
							}}
							autoplay={{ delay: 5000, pauseOnHover: true, pauseOnFocus: true }}
							arrows={false}
							pagination={false}
							options={{ rewind: true }}
							sliderBtnStyles='right-0 max-lg:top-[-0.2em] max-sm:top-[0.3rem]'
						>
							{allTitles.slice(0, 10).map(title => (
								<SplideSlide key={title.id}>
									<FullWidthSliderCard {...title} />
								</SplideSlide>
							))}
						</SplideSlider>
					</div>
				)}
			</div>
		</>
	)
}
