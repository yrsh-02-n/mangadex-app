'use client'

import { usePathname } from 'next/navigation'

import { SearchField } from '../ui/fields/searchField/SearchField'

import { UserMenu } from './user/UserMenu'

export function Header() {
	const pathname = usePathname()
	const isSearchPage = pathname?.includes('/search') || false

	return (
		<header className='flex justify-end items-center gap-[2rem] p-[1.5rem] h-[5rem]'>
			{!isSearchPage && <SearchField />}
			<UserMenu />
		</header>
	)
}
