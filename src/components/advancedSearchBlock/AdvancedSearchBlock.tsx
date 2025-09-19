'use client'

import { Search } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { PUBLIC_ROUTES } from '@/config/public-routes.config'

import { Button } from '../ui/button/Button'
import { Heading } from '../ui/heading/Heading'

export function AdvancedSearchBlock() {
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		setIsMobile(window.innerWidth <= 1070)
	}, [])

	return (
		<section className='relative h-[56rem] max-2xl:h-[38rem] max-lg:h-[42rem] max-xs:h-[32rem]'>
			<div className='absolute flex items-center px-[1.5rem] z-[2] w-full h-full right-0 max-lg:h-[34rem]'>
				<div className='flex flex-col items-center gap-[.5rem] mb-[2rem] text-shadow-xl'>
					<div className='mb-[2rem]'>
						<Heading
							className='text-balance text-4xl mb-[.5rem] max-lg:text-4xl max-md:text-4xl'
							isH1
						>
							Нужна помощь с поиском?
						</Heading>
						<p className='text-3xl text-balance max-[1678px]:w-[90%] text-shadow-xl max-lg:text-2xl max-md:text-2xl max-xs:text-lg'>
							Попробуйте расширенный поиск — он поможет найти именно то, что нужно!
						</p>
					</div>
					<Button
						variable='primary'
						className='self-start hover:bg-primary shadow-xl'
						isLink
						link={PUBLIC_ROUTES.TITLES}
					>
						Перейти к поиску
						<Search size={20} />
					</Button>
				</div>
			</div>

			<div className='absolute z-[-1] w-full h-full right-0 max-lg:h-[42rem]'>
				<Image
					src='/search-block.jpeg'
					alt='Background'
					fill
					style={{
						objectPosition: 'right top',
						objectFit: 'cover'
					}}
					priority
					quality={50}
				/>
			</div>
			<div
				className='absolute inset-0'
				style={{
					background: isMobile ? 'linear-gradient(to bottom, var(--bg), rgba(18, 18, 18, 0.5) 50%, rgba(0,0,0,0) 70%)' :
						'linear-gradient(to bottom, var(--bg), rgba(18, 18, 18, 0.8) 10%, rgba(0,0,0,0) 50%)',
					transition: 'opacity 0.2s ease'
				}}
			/>
		</section>
	)
}
