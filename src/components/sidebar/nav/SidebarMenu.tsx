import cn from 'clsx'

import { LogoutMenuItem } from '@/components/ui/logout/logoutMenuItem'

import { useAuth } from '@/utils/supabase/userActions/useAuth'

import { ISidebarMenuProps } from '../sidebar.types'

import { NavItem } from './NavItem'
import { SIDEBAR_DATA } from './Sidebar.data'

export function SidebarMenu({ isSidebarOpen }: ISidebarMenuProps) {
	const { isAuthenticated } = useAuth()

	const filteredData = SIDEBAR_DATA.filter(item => {
		const authOnlyItems = ['Моя библиотека', 'Настройки профиля', 'Выход']
		const guestOnlyItems = ['Вход']

		if (authOnlyItems.includes(item.label)) {
			return isAuthenticated
		}

		if (guestOnlyItems.includes(item.label)) {
			return !isAuthenticated
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
				{isAuthenticated && <LogoutMenuItem />}
			</ul>
		</nav>
	)
}
