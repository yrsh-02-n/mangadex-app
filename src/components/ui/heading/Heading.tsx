import cn from 'clsx'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface IHeadingProps {
	isH1: boolean
	children: ReactNode
	className?: string
}

// TODO: add back button

export function Heading({ isH1, children, className }: IHeadingProps) {
	return isH1 ? (
		<h1 className={twMerge('text-2xl font-semibold mb-[2rem] max-md:text-xl', className)}>
			{children}
		</h1>
	) : (
		<h2 className={cn('text-xl font-semibold mb-[2rem] max-md:text-lg', className)}>{children}</h2>
	)
}
