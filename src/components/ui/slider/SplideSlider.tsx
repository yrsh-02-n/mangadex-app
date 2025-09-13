'use client'

import { Splide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

export function SplideSlider({
	children,
	slidesPerView = 1,
	gap = '1rem',
	loop = true,
	autoplay = false,
	arrows = true,
	pagination = true,
	className = '',
	options = {},
	onSlideChange,
	...props
}: {
	children: React.ReactNode
	onSlideChange?: (index: number) => void
	slidesPerView?: number
	gap?: string
	loop?: boolean
	autoplay?: boolean | { delay?: number; pauseOnHover?: boolean; pauseOnFocus?: boolean }
	arrows?: boolean
	pagination?: boolean
	className?: string
	options?: object
}) {
	const defaultAutoplay = {
		delay: 2000,
		pauseOnHover: false,
		pauseOnFocus: false
	}

	let autoplaySettings: false | { delay: number; pauseOnHover: boolean; pauseOnFocus: boolean } =
		false

	if (autoplay === true) {
		autoplaySettings = defaultAutoplay
	} else if (typeof autoplay === 'object' && autoplay !== null) {
		autoplaySettings = { ...defaultAutoplay, ...autoplay }
	}

	const defaultOptions = {
		perPage: slidesPerView,
		perMove: 1,
		gap: gap,
		loop: loop,
		autoplay: autoplaySettings,
		arrows: arrows,
		pagination: pagination,
		rewind: true,
		...options
	}

	const handleActive = (splide: any) => {
		onSlideChange?.(splide.index)
	}

	return (
		<div className={className}>
			<Splide
				options={defaultOptions}
				onMove={handleActive}
				{...props}
			>
				{children}
			</Splide>
		</div>
	)
}
