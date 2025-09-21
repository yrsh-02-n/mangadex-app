import { ReactNode } from 'react'

interface Props {
	children: ReactNode
	itemName: string
}

export function SlugAttributesItem({ children, itemName }: Props) {
	return (
		<div>
			<p className='text-xl mb-[1rem]'>{itemName}</p>
			<div className='flex flex-wrap gap-[0.5rem]'>{children}</div>
		</div>
	)
}
