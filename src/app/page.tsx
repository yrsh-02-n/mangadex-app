import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'MangaNexus | Поиск манги',
	description: 'Поиск и каталогизация манги',
	keywords: ['Манга', 'Манга на русском'],
	icons: {
		icon: [
			{ url: '/favicon/favicon.svg' },
			{ url: '/favicon/icon-192x192.png', sizes: '192x192', type: 'image/png' },
			{ url: '/favicon/icon-512x512.png', sizes: '512x512', type: 'image/png' }
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
				alt: 'Портфолио frontend-разработичика и web-дизайнера Кирилла Л.'
			}
		],
		locale: 'ru_RU'
	}
}

export default async function Home() {
	return <div className='p-[1.5rem] text-white overflow-hidden'>Page</div>
}
