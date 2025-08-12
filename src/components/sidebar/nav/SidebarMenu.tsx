'use client'

import { NavItem } from './NavItem'
import { SIDEBAR_DATA } from './Sidebar.data'

export function SidebarMenu() {
	return (
		<nav>
			<ul className='flex flex-col gap-[1rem] w-full'>
				{SIDEBAR_DATA.map((item, index) => (
					<NavItem
						key={index}
						item={item}
						isShowedSideBar={true}
					/>
				))}
			</ul>
		</nav>
	)
}
