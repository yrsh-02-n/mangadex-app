import Select from 'react-select'

import { SelectFieldStyles } from './SelectFieldStyles'

export interface ISelectOption {
	readonly value: string
	readonly label: string
	readonly color?: string
}

type SelectValue = readonly ISelectOption[] | null

interface Props {
	options: readonly ISelectOption[]
	placeholder: string
	value: SelectValue
	onChange: (newValue: SelectValue) => void
}

export function SelectField({ options, placeholder, value, onChange }: Props) {
	return (
		<Select<ISelectOption, true>
			isMulti={true}
			placeholder={placeholder}
			options={options}
			styles={SelectFieldStyles}
			value={value}
			onChange={onChange}
		/>
	)
}
