import { Check } from 'lucide-react'

import { ISelectOption } from '../fields/selectField/SelectField'

interface RadioListProps {
	options: ISelectOption[]
	selected: string
	onChange: (value: string) => void
}

export function RadioList({ options, selected, onChange }: RadioListProps) {
	return (
		<div className='flex flex-col flex-wrap w-full'>
			{options.map(option => (
				<button
					key={option.value}
					type='button'
					onClick={() => onChange(option.value)}
					className={`flex items-center justify-between px-3 w-full text-left py-1 hover:bg-accent duration-200 transition-colors ${selected === option.value ? 'bg-accent text-white' : 'bg-primary'}`}
				>
					{option.label} {selected === option.value && <Check size={16} />}
				</button>
			))}
		</div>
	)
}
