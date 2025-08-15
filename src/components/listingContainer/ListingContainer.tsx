import { ReactNode, RefObject } from 'react'

interface ListingContainerProps {
	children: ReactNode
	ref?: RefObject<HTMLDivElement | null>
}

export function ListingContainer({ children, ref }: ListingContainerProps) {
	return (
		<div
			ref={ref}
			className='grid grid-cols-6 gap-[1rem] max-lg:grid-cols-3 max-md:grid-cols-2 max-s:grid-cols-1'
		>
			{children}
		</div>
	)
}
