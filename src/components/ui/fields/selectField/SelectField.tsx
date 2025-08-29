import Flag from 'react-flagkit'
import Select, {
	GroupBase,
	MultiValueProps,
	OptionProps,
	SingleValueProps,
	components
} from 'react-select'

import { FLAGS } from '@/constants/flags.constants'

import { SelectFieldStyles } from './SelectFieldStyles'
import { languagesOptions } from '@/app/titles/searchBlock/languages/languages.options'

export interface ISelectOption {
	readonly value: string
	readonly label: string
	readonly flag?: string
}

type SelectValue = readonly ISelectOption[] | null

// for change tags display to '+1' format at mobile resolution
const AdaptiveMultiValue: React.FC<
	MultiValueProps<ISelectOption, true, GroupBase<ISelectOption>>
> = props => {
	const allSelectedValues = props.selectProps.value as SelectValue
	const isSelectedArray = Array.isArray(allSelectedValues)
	const selectedCount = isSelectedArray ? allSelectedValues.length : 0

	const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 480 : false

	if (isMobile && isSelectedArray && selectedCount > 1) {
		const isFirst = props.index === 0

		if (isFirst) {
			return (
				<components.MultiValue {...props}>
					<div className=''>+{selectedCount}</div>
				</components.MultiValue>
			)
		} else {
			return null
		}
	}

	return <components.MultiValue {...props} />
}
//

// Single value with flag
const { Option } = components
const IconOption: React.FC<OptionProps<ISelectOption>> = props => (
	<Option {...props}>
		<div className='flex gap-[.5rem]'>
			{props.data.flag && <Flag country={props.data.flag} />}
			{props.data.label}
		</div>
	</Option>
)

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
			components={{
				MultiValue: AdaptiveMultiValue,
				Option: IconOption
			}}
		/>
	)
}
