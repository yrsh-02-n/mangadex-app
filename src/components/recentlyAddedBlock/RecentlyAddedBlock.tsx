'use client'

import { SplideSlide } from '@splidejs/react-splide'
import { EmblaOptionsType } from 'embla-carousel'
import { useEffect, useMemo, useState } from 'react'

import { useAllManga } from '@/hooks/useAllManga'
import { useEffectScroll } from '@/hooks/useEffectScroll'

import { getCoverArt } from '@/utils/getCoverArt'

import { FullWidthSliderCard } from '../titleCards/FullWidthSliderCard'
import { SplideSlider } from '../ui/slider/SplideSlider'

import { ITitle } from '@/types/title.types'

export function RecentlyAddedBlock() {
	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, isError } = useAllManga()
	const [activeTitle, setActiveTitle] = useState<ITitle | undefined>(undefined)
	const allTitles = useMemo(() => {
		return data?.pages.flatMap(page => page.data) || []
	}, [data])

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

	console.log(allTitles)

	// Устанавливаем первый тайтл как активный при загрузке данных
	useEffect(() => {
		if (allTitles.length > 0 && !activeTitle) {
			setActiveTitle(allTitles[0])
		}
	}, [allTitles, activeTitle])

	// Функция для получения background-image строки
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
						backgroundPosition: 'top',
						filter: 'brightness(0.12)',
						transition: 'background-image 0.2s ease'
					}}
				></div>
				<SplideSlider
					slidesPerView={1}
					onSlideChange={index => {
						setActiveTitle(allTitles[index])
					}}
				>
					{allTitles.slice(0, 10).map(title => (
						<SplideSlide key={title.id}>
							<FullWidthSliderCard {...title} />
						</SplideSlide>
					))}
				</SplideSlider>
			</div>
		</>
	)
}
