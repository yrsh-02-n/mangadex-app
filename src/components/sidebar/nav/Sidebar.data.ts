import { BookMarked, CalendarArrowDown, ClockPlus, Dice5, Settings } from 'lucide-react'

import { PUBLIC_ROUTES } from '@/config/public-routes.config'

import { ISidebarItem } from '../sidebar.types'
import { USER_ROUTES } from '@/config/user-page.config'

export const SIDEBAR_DATA: ISidebarItem[] = [
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
		link: USER_ROUTES.LIBRARY,
	},
	{
		icon: Settings,
		label: 'Настройки аккаунта',
		link: USER_ROUTES.SETTINGS,
	},
]
