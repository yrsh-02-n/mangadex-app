import { ISelectOption, SelectField } from '@/components/ui/fields/selectField/SelectField'

import { useSearchStore } from '@/store/search.store'

import { languagesOptions } from '../languages.options'

export function SearchByOriginLang() {
	const { selectedOriginalLangs, setSelectedOriginalLangs } = useSearchStore()

	const handleChange = (selectedOptions: readonly ISelectOption[] | null) => {
		const newSelectedValues = selectedOptions ? selectedOptions.map(option => option.value) : []

		setSelectedOriginalLangs(newSelectedValues)
	}

	const selectedOptionsForSelect = languagesOptions.filter(option =>
		selectedOriginalLangs.includes(option.value)
	)

	return (
		<div className='w-full'>
			<p className='mb-[.4rem]'>Язык оригинала</p>
			<SelectField
				options={languagesOptions}
				placeholder='Любой'
				value={selectedOptionsForSelect}
				onChange={handleChange}
			/>
		</div>
	)
}
