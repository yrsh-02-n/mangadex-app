'use client'

import cn from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useSidebarStore } from '@/store/ui.store'

import { IMenuItemProps } from '../sidebar.types'

export function NavItem({ item }: IMenuItemProps) {
	const { isSidebarOpen, toggleSidebar } = useSidebarStore()
	const pathName = usePathname()
	if (!item) return null
	const isActive = pathName === item.link

	return (
		<li className={item.isBottomBorder ? 'pb-[2rem] mb-[.8rem] border-b border-white' : ''}>
			<Link
				href={item.link}
				title={item.label}
				className='flex gap-[.8rem] items-center group text-nowrap'
			>
				<item.icon
					size={24}
					className={cn(
						'group-hover:text-accent transition-colors duration-200 shrink-0',
						isActive ? 'text-accent' : 'text-white'
					)}
				/>
				<span
					className={cn(
						'hover:text-accent group-hover:text-accent text-lg transition-all duration-200',
						isActive ? 'text-accent opacity-100' : 'text-white',
						!isSidebarOpen && 'hidden opacity-0'
					)}
				>
					{item.label}
				</span>
			</Link>
		</li>
	)
}
