'use client'

import { Splide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import { useEffect, useRef } from 'react'

import { SliderControls } from './SliderControls'

export function SplideSlider({
	children,
	slidesPerView = 1,
	gap = '1rem',
	loop = true,
	autoplay = false,
	arrows = true,
	pagination = true,
	className = '',
	onSlideChange,
	options = {},
	sliderBtnStyles = '',
	...props
}: {
	children: React.ReactNode
	slidesPerView?: number
	gap?: string
	loop?: boolean
	autoplay?: boolean | { delay?: number; pauseOnHover?: boolean; pauseOnFocus?: boolean }
	arrows?: boolean
	pagination?: boolean
	className?: string
	onSlideChange?: (index: number) => void
	options?: object
	sliderBtnStyles?: string
}) {
	const splideRef = useRef<any>(null)

	const defaultOptions = {
		perPage: slidesPerView,
		perMove: 1,
		gap: gap,
		loop: loop,
		type: 'loop',
		arrows: arrows,
		pagination: pagination,
		rewind: false,
		...(typeof autoplay === 'object' ? { autoplay } : {}),
		...options
	}

	const goPrev = () => {
		if (splideRef.current) {
			splideRef.current.go('<')
		}
	}

	const goNext = () => {
		if (splideRef.current) {
			splideRef.current.go('>')
		}
	}

	useEffect(() => {
		let intervalId: any

		if (typeof autoplay === 'boolean' && autoplay && splideRef.current) {
			const startAutoplay = () => {
				intervalId = setInterval(() => {
					if (splideRef.current) {
						splideRef.current.go('>')
					}
				}, 5000)
			}

			startAutoplay()
		}

		return () => {
			if (intervalId) clearInterval(intervalId)
		}
	}, [autoplay])

	return (
		<div className='relative'>
			<Splide
				ref={splideRef}
				options={defaultOptions}
				onMoved={(splide: any) => onSlideChange?.(splide.index)}
				onActive={(splide: any) => onSlideChange?.(splide.index)}
				{...props}
			>
				{children}
			</Splide>
			<SliderControls
				prevAction={goPrev}
				nextAction={goNext}
				sliderBtnStyles={sliderBtnStyles}
			/>
		</div>
	)
}
