'use client'

import cn from 'clsx'

import { ISidebarMenuProps } from '../sidebar.types'

import { NavItem } from './NavItem'
import { SIDEBAR_DATA } from './Sidebar.data'

export function SidebarMenu({ isSidebarOpen }: ISidebarMenuProps) {
	return (
		<nav>
			<ul className={cn('flex flex-col gap-[1rem] w-full', !isSidebarOpen && 'items-center')}>
				{SIDEBAR_DATA.map((item, index) => (
					<NavItem
						key={index}
						item={item}
						isSidebarOpen={isSidebarOpen}
					/>
				))}
			</ul>
		</nav>
	)
}
