import { LucideIcon } from 'lucide-react'

export interface ISidebarItem {
	icon: LucideIcon
	link: string
	label: string
	isBottomBorder?: boolean
  authRequired?: boolean
}

export interface ISidebarMenuProps {
	isSidebarOpen: boolean
}

export interface IMenuItemProps {
	item?: ISidebarItem
	isSidebarOpen: boolean
}
