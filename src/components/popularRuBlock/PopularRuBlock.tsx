import { SplideSlide } from '@splidejs/react-splide'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { usePopularRuManga } from '@/hooks/usePopularRuManga'

import { getSlidesCount } from '@/utils/getSlidesCount'

import { TileCard } from '../titleCards/TileCard'
import { SkeletonLoader } from '../ui/skeletonLoader/SkeletonLoader'
import { SplideSlider } from '../ui/slider/SplideSlider'

export function PopularRuBlock() {
	const { data, isLoading } = usePopularRuManga()
	const slidesCount: number = getSlidesCount()
	const [isPagination, setIsPagination] = useState<boolean>(false)
	const [isArrows, setIsArrows] = useState<boolean>(false)

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 640) {
				setIsPagination(true)
				setIsArrows(false)
			} else {
				setIsPagination(false)
				setIsArrows(true)
			}
		}

		handleResize()

		window.addEventListener('resize', handleResize)

		return () => window.removeEventListener('resize', handleResize)
	}, [])

	// titles
	const allTitles = data?.pages.flatMap(page => page.data) || []

	return !isLoading ? (
		<div className=''>
			<SplideSlider
				autoplay={false}
				slidesPerView={slidesCount}
				arrows={false}
				pagination={isPagination}
				type={'loop'}
				options={{ perMove: 1 }}
				sliderBtnStyles={twMerge(
					'right-0 bottom-[-5rem] max-lg:top-[-4.2rem] max-sm:top-[0.3rem]',
					!isArrows && 'hidden'
				)}
			>
				{allTitles.map(title => (
					<SplideSlide key={title.id}>
						<TileCard
							attributes={title.attributes}
							id={title.id}
							relationships={title.relationships}
						/>
					</SplideSlide>
				))}
			</SplideSlider>
		</div>
	) : (
		<div
			className={twMerge(
				'grid gap-[1rem]',
				slidesCount === 6 && 'grid-cols-6',
				slidesCount === 4 && 'grid-cols-4',
				slidesCount === 2 && 'grid-cols-2',
				slidesCount === 1 && 'grid-cols-1'
			)}
		>
			<SkeletonLoader
				count={1}
				className='w-full h-[32rem]'
			/>
		</div>
	)
}
