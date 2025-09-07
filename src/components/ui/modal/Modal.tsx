import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface props {
	isShow: boolean
	ref: any
	children: ReactNode
	width?: string
	className?: string
}

export function Modal({ ref, isShow, children, width = '100%', className }: props) {
	return (
		<div
			ref={ref}
			className={twMerge(
				'absolute w-full max-h-[30rem] bg-primary rounded hidden p-[1rem] overflow-y-auto',
				isShow && 'block z-100 mt-[.5rem]',
				className
			)}
			style={{ width }}
		>
			{children}
		</div>
	)
}
