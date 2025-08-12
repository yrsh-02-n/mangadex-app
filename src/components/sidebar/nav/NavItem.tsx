import cn from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tw-merge'

import { IMenuItemProps } from '../sidebar.types'

export function NavItem({ item, isShowedSideBar}: IMenuItemProps) {
	const pathName = usePathname()
	const isActive = pathName === item.link

	return (
		<li className={item.isBottomBorder ? ' pb-[2rem] mb-[.8rem] border-b border-white' : ''}>
			<Link
				href={item.link}
				title={item.label}
				className='flex gap-[.8rem] items-center group'
			>
				<item.icon
					className={cn(
						'group-hover:text-accent transition-colors duration-200',
						isActive ? 'text-accent' : 'text-white'
					)}
				/>
				<span
					className={cn(
						'hover:text-accent group-hover:text-accent text-lg transition-colors duration-200',
						isActive ? 'text-accent' : 'text-white'
					)}
				>
					{item.label}
				</span>
			</Link>
		</li>
	)
}
