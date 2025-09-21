import { ISelectOption, SelectField } from '@/components/ui/fields/selectField/SelectField'

import { useSearchStore } from '@/store/search.store'

import { languagesOptions } from '../languages.options'

export function SearchByTranslatedLang() {
	const { selectedTranslatedLangs, setSelectedTranslatedLangs } = useSearchStore()

	const handleChange = (selectedOptions: readonly ISelectOption[] | null) => {
		const newSelectedValues = selectedOptions ? selectedOptions.map(option => option.value) : []

		setSelectedTranslatedLangs(newSelectedValues)
	}

	const sortedLanguages = [...languagesOptions].sort((a, b) => {
		// russian lang first
		if (a.value === 'ru') return -1
		if (b.value === 'ru') return 1

		// belarusian lang second
		if (a.value === 'be') return -1
		if (b.value === 'be') return 1

		// english third
		if (a.value === 'en') return -1
		if (b.value === 'en') return 1

		// other
		return 0
	})

	const selectedOptionsForSelect = sortedLanguages.filter(option =>
		selectedTranslatedLangs.includes(option.value)
	)

	return (
		<div className='w-full'>
			<p className='mb-[.4rem]'>Доступный перевод</p>
			<SelectField
				options={sortedLanguages}
				placeholder='Любой'
				value={selectedOptionsForSelect}
				onChange={handleChange}
			/>
		</div>
	)
}
