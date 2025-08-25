import { SelectField } from '@/components/ui/fields/selectField/SelectField'

interface Props {}

const options = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' }
]

export function SearchByDemographic({}: Props) {
	return (
		<div>
			<p></p>
			<SelectField options={options} placeholder='Выбрать возрастную группу' />
		</div>
	)
}
