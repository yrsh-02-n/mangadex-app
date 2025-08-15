import { Metadata } from 'next'

import { Heading } from '@/components/ui/heading/Heading'

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
		images: [
			{
				url: 'https://yrshdev.ru/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'Поиск и каталогизация манги'
			}
		],
		locale: 'ru_RU'
	}
}

export default async function Home() {
	return (
		<div className='text-white overflow-hidden'>
			<section>
				<Heading isH1>Недавно добавленные</Heading>
			</section>
		</div>
	)
}
