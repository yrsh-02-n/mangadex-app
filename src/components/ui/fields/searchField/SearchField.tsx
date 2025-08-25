import { Search } from 'lucide-react'

import { DefaultField } from '../DefaultField'
import { IFieldProps } from '../fields.types'

// interface ISearchField extends IFieldProps {}

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
