import { StylesConfig } from 'react-select'

import { ISelectOption } from './SelectField'
import '@/app/globals.css'

export const SelectFieldStyles: StylesConfig<ISelectOption, true> = {
	// main container
	control: (provided, state) => ({
		...provided,
		backgroundColor: state.isFocused ? 'var(--primary)' : 'var(--primary)',
		borderColor: state.isFocused ? 'var(--primary)' : 'var(--primary)',
		boxShadow: state.isFocused ? 'var(--primary)' : provided.boxShadow,
		minHeight: '32px',
		cursor: 'pointer',
		':hover': {
			borderColor: state.isFocused ? 'var(--primary)' : 'var(--primary)'
		}
	}),
	// input and value
	valueContainer: provided => ({
		...provided,
		backgroundColor: 'var(--primary)',
		flexWrap: 'nowrap'
	}),
	// input
	input: provided => ({
		...provided,
		color: 'var(--white)'
		// caretColor: 'var(--accent)'
	}),
	// placeholder
	placeholder: provided => ({
		...provided,
		color: '#999'
	}),
	// dropdown menu
	menu: provided => ({
		...provided,
		backgroundColor: 'var(--primary)',
		border: '1px solid var(--primary)',
		boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
		zIndex: 1000
	}),
	// options inside menu
	menuList: provided => ({
		...provided,
		maxHeight: '500px' // list maxHeight
	}),
	// option item
	option: (provided, state) => ({
		...provided,
		fontWeight: state.isSelected ? 'bold' : 'normal',
		color: state.isSelected ? 'var(--white)' : 'var(--white)',
		backgroundColor: state.isSelected
			? 'var(--accent)'
			: state.isFocused
				? 'var(--accent)'
				: 'var(--primary)',
		':active': {
			backgroundColor: state.isSelected ? state.data.color : 'var(--accent-hover)'
		}
	}),
	// multiValue
	multiValue: provided => ({
		...provided,
		backgroundColor: 'var(--accent)', // tag bg
		maxWidth: '150px'
	}),
	// multiValue text
	multiValueLabel: provided => ({
		...provided,
		color: 'var(--white)', // tag text
		fontWeight: 'bold'
	}),
	// delete btn
	multiValueRemove: provided => ({
		...provided,
		color: 'var(--white)',
		':hover': {
			backgroundColor: 'var(--accent)',
			color: 'var(--white)'
		}
	}),
	// indicator
	dropdownIndicator: provided => ({
		...provided,
		color: 'var(--white)', // arrow color
		':hover': {
			color: 'var(--accent)'
		}
	}),
	// divider
	indicatorSeparator: provided => ({
		...provided,
		backgroundColor: 'var(--accent)'
	})
}
