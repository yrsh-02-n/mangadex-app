'use client'

import { SplideSlide } from '@splidejs/react-splide'
import { useEffect, useMemo, useState } from 'react'

import { useAllManga } from '@/hooks/useAllManga'
import { useEffectScroll } from '@/hooks/useEffectScroll'

import { getCoverArt } from '@/utils/getCoverArt'

import { FullWidthSliderCard } from '../titleCards/FullWidthSliderCard'
import { SplideSlider } from '../ui/slider/SplideSlider'

import { ITitle } from '@/types/title.types'

export function RecentlyAddedBlock() {
	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, isError } = useAllManga()
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

	// get cover url for bg
	const getBackgroundImage = (title: ITitle | undefined) => {
		if (!title) return 'none'
		const imageUrl = getCoverArt(title.relationships, title.id)
		return imageUrl ? `url(${imageUrl})` : 'none'
	}

	return (
		<>
			<div className='overflow-hidden w-full'>
				<div
					className='absolute top-0 w-full h-[32rem] right-0 z-[-1]'
					style={{
						backgroundImage: getBackgroundImage(activeTitle),
						backgroundSize: 'cover',
						backgroundPosition: 'center 40%',
						filter: 'brightness(0.12)',
						transition: 'background-image 0.2s ease',
						opacity: activeTitle ? 1 : 0
					}}
				></div>

				{allTitles.length > 0 ? (
					<SplideSlider
						slidesPerView={1}
						onSlideChange={index => {
							const validIndex = Math.max(0, Math.min(index, allTitles.length - 1))
							setActiveIndex(validIndex)
						}}
						autoplay
					>
						{allTitles.slice(0, 10).map(title => (
							<SplideSlide key={title.id}>
								<FullWidthSliderCard {...title} />
							</SplideSlide>
						))}
					</SplideSlider>
				) : (
					<div className='h-64 flex items-center justify-center'>
						{isLoading ? 'Загрузка...' : 'Нет данных'}
					</div>
				)}
			</div>
		</>
	)
}
