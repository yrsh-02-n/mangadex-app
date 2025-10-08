import { ISelectOption, SelectField } from '@/components/ui/fields/selectField/SelectField'

import { useSearchStore } from '@/store/search.store'

import { getLocalizedStatus } from '@/utils/getLocalizedStatus'

import { Status } from '@/types/enums'

const statusOptions = [
	{
		value: Status.ONGOING,
		label: getLocalizedStatus(Status.ONGOING)
	},
	{
		value: Status.COMPLETED,
		label: getLocalizedStatus(Status.COMPLETED)
	},
	{
		value: Status.HIATUS,
		label: getLocalizedStatus(Status.HIATUS)
	},
	{
		value: Status.CANCELLED,
		label: getLocalizedStatus(Status.CANCELLED)
	}
]

export function SearchByStatus() {
	const { selectedStatus, setSelectedStatus } = useSearchStore()

	const handleChange = (selectedOptions: readonly ISelectOption[] | null) => {
		const newSelectedValues = selectedOptions ? selectedOptions.map(option => option.value) : []

		setSelectedStatus(newSelectedValues)
	}

	const selectedOptionsForSelect = statusOptions.filter(option =>
		selectedStatus.includes(option.value)
	)

	return (
		<div className='w-full'>
			<p className='mb-[.4rem]'>Статус публикации</p>
			<SelectField
				options={statusOptions}
				placeholder='Любой'
				value={selectedOptionsForSelect}
				onChange={handleChange}
			/>
		</div>
	)
}
