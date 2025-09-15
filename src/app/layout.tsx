import type { Metadata } from 'next'
import { Murecho } from 'next/font/google'

import { Header } from '@/components/header/Header'
import { SidebarClient } from '@/components/sidebar/nav/SidebarClient'

import { Providers } from '@/providers/Providers'

import './globals.css'

const murecho = Murecho({
	variable: '--font-murecho',
	subsets: ['cyrillic', 'latin']
})

export const metadata: Metadata = {
	title: 'MangaNexus',
	description: 'Поиск манги'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang='ru'
			data-scroll-behavior='smooth'
		>
			<body className={`${murecho.variable} antialiased text-white h-screen`}>
				<Providers>
					<main className='flex h-full w-full'>
						<SidebarClient />
						<div className='flex flex-col flex-grow h-full min-w-0 relative'>
							<Header />
							<section
								id='main-scroll-container'
								className='flex-grow min-h-0 pb-[2rem] text-white overflow-y-scroll'
							>
								{children}
							</section>
						</div>
					</main>
				</Providers>
			</body>
		</html>
	)
}
