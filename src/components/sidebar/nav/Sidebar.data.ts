import { BookMarked, CalendarArrowDown, ClockPlus, Dice5, Search, Settings } from 'lucide-react'

import { PUBLIC_ROUTES } from '@/config/public-routes.config'
import { USER_ROUTES } from '@/config/user-page.config'

import { ISidebarItem } from '../sidebar.types'

export const SIDEBAR_DATA: ISidebarItem[] = [
	{
		icon: Search,
		label: 'Расширенный поиск',
		link: PUBLIC_ROUTES.TITLES
	},
	{
		icon: ClockPlus,
		label: 'Недавно добавленные',
		link: PUBLIC_ROUTES.RECENTLY
	},
	{
		icon: CalendarArrowDown,
		label: 'Последние обновления',
		link: PUBLIC_ROUTES.LATEST
	},
	{
		icon: Dice5,
		label: 'Случайная манга',
		link: PUBLIC_ROUTES.RANDOM,
		isBottomBorder: true
	},
	{
		icon: BookMarked,
		label: 'Моя библиотека',
		link: USER_ROUTES.LIBRARY
	},
	{
		icon: Settings,
		label: 'Настройки аккаунта',
		link: USER_ROUTES.SETTINGS
	}
]
