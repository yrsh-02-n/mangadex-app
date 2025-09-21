import cn from 'clsx'

import { useAuth } from '@/utils/isAuth'

import { ISidebarMenuProps } from '../sidebar.types'

import { NavItem } from './NavItem'
import { SIDEBAR_DATA } from './Sidebar.data'

export function SidebarMenu({ isSidebarOpen }: ISidebarMenuProps) {
	const isUserLoggedIn = useAuth()

	const filteredData = SIDEBAR_DATA.filter(item => {
		const authOnlyItems = ['Моя библиотека', 'Настройки аккаунта', 'Выход']
		const guestOnlyItems = ['Вход']

		if (authOnlyItems.includes(item.label)) {
			return isUserLoggedIn
		}

		if (guestOnlyItems.includes(item.label)) {
			return !isUserLoggedIn
		}

		return true
	})

	return (
		<nav>
			<ul className={cn('flex flex-col gap-[1rem] w-full', !isSidebarOpen && 'items-center')}>
				{filteredData.map((item, index) => (
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
