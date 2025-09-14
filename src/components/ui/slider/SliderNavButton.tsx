import cn from 'clsx'
import { ReactNode } from 'react'

interface Props {
	onClick: () => void
	className?: string
	children: ReactNode
}

export function SliderNavButton({ className, onClick, children }: Props) {
	return (
		<div>
			<button
				onClick={onClick}
				className={cn(
					'bg-transparent text-white border-white border p-[.5rem] hover:bg-accent hover:text-dark hover:border-accent transition-colors duration-200 rounded',
					className
				)}
			>
				{children}
			</button>
		</div>
	)
}
