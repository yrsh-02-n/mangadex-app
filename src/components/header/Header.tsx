import Image from 'next/image'
import { SearchField } from '../ui/fields/searchField/SearchField'
import { UserMenu } from './user/UserMenu'

export function Header() {
	return (
		<header className='flex justify-between items-center gap-[2rem] p-[1.5rem] h-[5rem]'>
			{/* search field */}
			<SearchField />
      <UserMenu />
		</header>
	)
}
