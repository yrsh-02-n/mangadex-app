'use client'

import cn from 'clsx'
import { ChevronsRight, X } from 'lucide-react'
import Link from 'next/link'

import { useSidebarStore } from '@/store/ui.store'

import { Logo } from '../header/logo/Logo'

import { SidebarMenu } from './nav/SidebarMenu'

export function Sidebar() {
	const { isSidebarOpen, toggleSidebar } = useSidebarStore()

	return (
		<div
			className={cn(
				'flex flex-col justify-between bg-primary min-h-full transition-all duration-100 ease-in',
				isSidebarOpen
					? 'w-[20rem] p-[1.5rem] max-sm:absolute max-sm:w-screen max-sm:z-999'
					: 'w-[3rem] p-[.5rem] pt-[1.5rem]'
			)}
		>
			<div className='flex flex-col gap-[3rem] overflow-hidden'>
				<div
					className={cn(
						'flex gap-[1rem] justify-between items-center',
						!isSidebarOpen && 'flex-col'
					)}
				>
					<Logo isSidebarOpen={isSidebarOpen} />
					<button
						onClick={toggleSidebar}
						className={cn(
							'text-white hover:text-accent transition-colors duration-200',
							isSidebarOpen ? '' : ''
						)}
						title=''
					>
						{isSidebarOpen ? <X size={24} /> : <ChevronsRight size={24} />}
					</button>
				</div>
				<SidebarMenu isSidebarOpen={isSidebarOpen} />
			</div>
			<div className={cn('flex flex-col gap-[1rem]', !isSidebarOpen && 'hidden')}>
				<span className='text-sm text-white text-nowrap'>
					Сайт работает на{' '}
					<Link
						href={'https://mangadex.org/'}
						className='transition-colors duration-200 hover:text-accent'
						title={'Ссылка на MangaDex'}
					>
						MangaDex API
					</Link>
				</span>
				<Link
					href={'https://github.com/yrsh-02-n/mangadex-app'}
					className='text-white flex gap-[.5rem] items-center text-sm transition-colors duration-200 hover:text-accent text-nowrap'
					title='Ссылка на страницу проекта в Github'
				>
					<span>Ссылка на Github</span>
				</Link>
			</div>
		</div>
	)
}
