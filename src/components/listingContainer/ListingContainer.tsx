import { ReactNode } from 'react'

import { DisplayModeSwitcher } from '../ui/DisplayModeSwitcher/DisplayModeSwitcher'

interface ListingContainerProps {
	children: ReactNode
	displayMode?: 'tiles' | 'grid'
	onModeChange: (mode: 'tiles' | 'grid') => void
	hasBg: boolean
}

export function ListingContainer({
	children,
	displayMode = 'tiles',
	onModeChange,
	hasBg
}: ListingContainerProps) {
	return (
		<div>
			<div className='flex justify-end w-full mb-[1rem]'>
				<DisplayModeSwitcher
					onModeChange={onModeChange}
					hasBg={hasBg}
				/>
			</div>
			<div
				className={
					displayMode === 'tiles'
						? 'grid grid-cols-6 gap-[1rem] max-lg:grid-cols-3 max-md:grid-cols-2 max-s:grid-cols-1'
						: 'grid grid-cols-2 gap-[1rem] max-xl:grid-cols-1'
				}
			>
				{children}
			</div>
		</div>
	)
}
