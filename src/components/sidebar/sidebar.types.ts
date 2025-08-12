import { LucideIcon } from 'lucide-react'

export interface ISidebarItem {
	icon: LucideIcon
	link: string
	label: string
	isBottomBorder?: boolean
}

export interface IMenuItemProps {
	item: ISidebarItem
	isShowedSideBar: boolean
}
