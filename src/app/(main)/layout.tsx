'use client'

import { Murecho } from 'next/font/google'

import { Header } from '@/components/header/Header'
import { SidebarClient } from '@/components/sidebar/nav/SidebarClient'

import { Providers } from '@/providers/Providers'

import '../globals.css'



export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<Providers>
			<main className='flex h-full w-full'>
				<SidebarClient />
				<div className='flex flex-col flex-grow h-full min-w-0 relative'>
					<Header />
					<section
						id='main-scroll-container'
						className='flex-grow min-h-0 pb-0 text-white overflow-y-scroll'
					>
						{children}
					</section>
				</div>
			</main>
		</Providers>
	)
}
