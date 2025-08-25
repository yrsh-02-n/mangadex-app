import Select from 'react-select'

import { SelectFieldStyles } from './SelectFieldStyles'

export interface ISelectOption {
	readonly value: string
	readonly label: string
	readonly color?: string
}

interface Props {
	options: readonly ISelectOption[]
	placeholder: string
}

export function SelectField({ options, placeholder }: Props) {
	return (
		<Select<ISelectOption, true>
			isMulti={true}
			placeholder={placeholder}
			options={options}
			styles={SelectFieldStyles}
		/>
	)
}
