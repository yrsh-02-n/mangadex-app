import { ISelectOption, SelectField } from '@/components/ui/fields/selectField/SelectField'

import { useSearchStore } from '@/store/search.store'

import { PublicationDemographic } from '@/types/enums'

const demographicOptions = [
	{ value: PublicationDemographic.SHOUNEN, label: 'Сёнэн (Юноши 12-18)' },
	{ value: PublicationDemographic.SHOUJO, label: 'Сёдзё (Девушки 12-18)' },
	{ value: PublicationDemographic.JOSEI, label: 'Дзёсэй (Мужчины 18-35)' },
	{ value: PublicationDemographic.SEINEN, label: 'Сэйнэн (Женщины 18-35)' }
]

export function SearchByDemographic() {
	const { selectedDemographics, setSelectedDemographics } = useSearchStore()

	const handleChange = (selectedOptions: readonly ISelectOption[] | null) => {
		const newSelectedValues = selectedOptions ? selectedOptions.map(option => option.value) : []

		setSelectedDemographics(newSelectedValues)
	}

	const selectedOptionsForSelect = demographicOptions.filter(option =>
		selectedDemographics.includes(option.value)
	)

	return (
		<div>
			<p className='mb-[1rem]'>Возрастная группа</p>
			<SelectField
				options={demographicOptions}
				placeholder='Любая'
				value={selectedOptionsForSelect}
				onChange={handleChange}
			/>
		</div>
	)
}
