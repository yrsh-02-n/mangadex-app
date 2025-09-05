import { ISelectOption, SelectField } from '@/components/ui/fields/selectField/SelectField'

import { useSearchStore } from '@/store/search.store'

import { getLocalizedDemographic } from '@/utils/getLocalizedDemographic'

import { PublicationDemographic } from '@/types/enums'

const demographicOptions = [
	{
		value: PublicationDemographic.SHOUNEN,
		label: getLocalizedDemographic(PublicationDemographic.SHOUNEN)
	},
	{
		value: PublicationDemographic.SHOUJO,
		label: getLocalizedDemographic(PublicationDemographic.SHOUJO)
	},
	{
		value: PublicationDemographic.JOSEI,
		label: getLocalizedDemographic(PublicationDemographic.JOSEI)
	},
	{
		value: PublicationDemographic.SEINEN,
		label: getLocalizedDemographic(PublicationDemographic.SEINEN)
	}
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
		<div className='w-full'>
			<p className='mb-[.4rem]'>Возрастная группа</p>
			<SelectField
				options={demographicOptions}
				placeholder='Любая'
				value={selectedOptionsForSelect}
				onChange={handleChange}
			/>
		</div>
	)
}
