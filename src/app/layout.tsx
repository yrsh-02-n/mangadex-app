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
		<html lang='ru'>
			<body className={`${murecho.variable} antialiased text-white`}>
				<Providers>
					<div className='flex min-h-screen'>
						<SidebarClient />
						<div className='w-full'>
							<Header />
							{children}
						</div>
					</div>
				</Providers>
			</body>
		</html>
	)
}
