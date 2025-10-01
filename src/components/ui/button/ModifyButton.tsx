import cn from 'clsx'
import { ReactNode } from 'react'

interface Props {
	onClick: () => void
	disabled?: boolean
	classname?: string
	children: ReactNode
	hasBorder?: boolean
}
export function ModifyButton({ onClick, disabled, classname, children, hasBorder }: Props) {
	return (
		<div className='inline-block'>
			<button
				onClick={onClick}
				disabled={disabled}
				className={cn(
					'text-white border-white hover:text-accent hover:border-accent transition-colors duration-200 italic border-dotted',
					hasBorder && 'border-b',
					classname
				)}
			>
				{children}
			</button>
		</div>
	)
}
