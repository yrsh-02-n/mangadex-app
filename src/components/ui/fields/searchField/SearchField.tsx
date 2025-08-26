import { Search } from 'lucide-react'

import { DefaultField } from '../DefaultField'

export function SearchField() {
	return (
		<DefaultField
			placeholder='Поиск манги по названию'
			icon={Search}
			variant='search'
			size='sm'
			fullwidth
		/>
	)
}
