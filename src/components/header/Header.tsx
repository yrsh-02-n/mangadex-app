'use client'

import { SearchField } from '../ui/fields/searchField/SearchField'

import { UserMenu } from './user/UserMenu'

export function Header() {
	return (
		<header className='flex justify-end items-center gap-[2rem] p-[1.5rem] h-[5rem]'>
			<SearchField />
			<UserMenu />
		</header>
	)
}
