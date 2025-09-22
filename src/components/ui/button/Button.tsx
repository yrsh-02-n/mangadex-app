import Link from 'next/link'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps {
	children?: ReactNode
	variable: 'primary' | 'secondary'
	isDisabled?: boolean
	onClick?: () => void
	className?: string
	isLink?: boolean
	link?: string
	type?: string
	formAction?: (formData: FormData) => Promise<void>
}

export function Button({
	children,
	variable,
	isDisabled,
	onClick,
	className,
	isLink = false,
	type = 'button',
	link
}: ButtonProps) {
	return isLink ? (
		<Link
			href={link as string}
			className={twMerge('self-start', className)}
		>
			<button
				disabled={isDisabled}
				className={twMerge(
					'disabled:bg-disabled text-lg flex gap-[.5rem] justify-center items-center text-white px-[1rem] py-[.5rem] rounded transition-colors duration-200',
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
		</Link>
	) : (
		<button
			disabled={isDisabled}
			className={twMerge(
				'disabled:bg-disabled text-lg flex gap-[.5rem] justify-center items-center text-white px-[1rem] py-[.5rem] rounded transition-colors duration-200',
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
