import { Metadata } from 'next'

import { DynamicLatestUpdatesBlock } from '@/components/latestUpdatesBlock/DynamicLatestUpdatesBlock'
import { DynamicPopularRuBlock } from '@/components/popularRuBlock/DynamicPopularRuBlock'
import { DynamicResentlyAddedBlock } from '@/components/recentlyAddedBlock/DynamicResentlyAddedBlock'
import { ArrowButton } from '@/components/ui/button/ArrowButton'
import { Heading } from '@/components/ui/heading/Heading'

import { PUBLIC_ROUTES } from '@/config/public-routes.config'

export const metadata: Metadata = {
	title: 'MangaNexus | Поиск манги',
	description: 'Поиск и каталогизация манги',
	keywords: ['Манга', 'Манга на русском'],
	icons: {
		icon: [
			{ url: '/favicon.ico' },
			{ url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
			{ url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' }
		]
	},
	authors: [{ name: 'Кирилл Л.' }],
	creator: 'Кирилл Л.',
	publisher: 'Кирилл Л.',
	openGraph: {
		title: 'MangaNexus',
		description: 'Поиск и каталогизация манги',
		url: '',
		siteName: 'MangaNexus',
		// images: [
		// 	{
		// 		url: 'https://yrshdev.ru/og-image.jpg',
		// 		width: 1200,
		// 		height: 630,
		// 		alt: 'Поиск и каталогизация манги'
		// 	}
		// ],
		locale: 'ru_RU'
	}
}

export default async function Home() {
	return (
		<div className='text-white overflow-hidden flex flex-col'>
			<section className='relative mb-[6rem] max-md:mb-[3rem]'>
				<DynamicResentlyAddedBlock />
			</section>
			<section className='px-[1.5rem] mb-[6rem] max-md:mb-[8rem]'>
				<div className='flex items-center gap-[.5rem] mb-[2rem]'>
					<Heading
						className='mb-0'
						isH1
					>
						Популярная манга на русском 🇷🇺
					</Heading>
					<ArrowButton link={PUBLIC_ROUTES.POPULAR} />
				</div>
				<DynamicPopularRuBlock />
			</section>
			<section className='px-[1.5rem]'>
				<div className='flex items-center gap-[.5rem] mb-[2rem]'>
					<Heading
						className='mb-0'
						isH1
					>
						Последние обновления
					</Heading>
					<ArrowButton link={PUBLIC_ROUTES.LATEST} />
				</div>
				<DynamicLatestUpdatesBlock />
			</section>
		</div>
	)
}
