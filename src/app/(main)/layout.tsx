'use client'

import { useRef } from 'react'

import { Header } from '@/components/header/Header'
import { SidebarClient } from '@/components/sidebar/nav/SidebarClient'

import { Providers } from '@/providers/Providers'

export default function MainLayout({ children }: { children: React.ReactNode }) {
	const scrollContainerRef = useRef<HTMLDivElement>(null)
	return (
		<Providers>
			<main className='flex h-screen w-full'>
				<SidebarClient />
				<div className='flex flex-col flex-grow h-full min-w-0 relative'>
					<Header scrollRef={scrollContainerRef} />
					<section
						ref={scrollContainerRef}
						className='flex-grow min-h-0 pb-0 text-white overflow-y-auto'
					>
						{children}
					</section>
				</div>
			</main>
		</Providers>
	)
}
