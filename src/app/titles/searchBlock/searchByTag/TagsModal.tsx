import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface props {
	isShow: boolean
	ref: any
	children: ReactNode
	width?: string
}

export function TagsModal({ ref, isShow, children, width = '100%' }: props) {
	return (
		<div
			ref={ref}
			className={twMerge(
				'absolute w-full min-h-[30rem] bg-primary rounded hidden p-[1rem]',
				isShow && 'block z-100 mt-[1rem]'
			)}
			style={{ width }}
		>
			{children}
		</div>
	)
}
