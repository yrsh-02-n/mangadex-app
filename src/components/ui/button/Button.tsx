import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps {
	children?: ReactNode
	variable: 'primary' | 'secondary'
	isDisabled?: boolean
	onClick?: () => void
	className?: string
}

export function Button({ children, variable, isDisabled, onClick, className }: ButtonProps) {
	return (
		<button
			disabled={isDisabled}
			className={twMerge(
				'disabled:bg-disabled text-lg text-white px-[.5rem] py-[.5rem] rounded transition-colors duration-200',
				variable === 'primary'
					? 'bg-accent hover:bg-accent-hover'
					: 'bg-primary hover:bg-primary-hover',

				isDisabled && 'cursor-not-allowed',
				className
			)}
			onClick={onClick}
		>
			{children}
		</button>
	)
}
