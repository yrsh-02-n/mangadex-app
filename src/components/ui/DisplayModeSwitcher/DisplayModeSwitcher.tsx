'use client'

import cn from 'clsx'
import { LayoutGrid, LayoutList } from 'lucide-react'
import { useState } from 'react'

import { Button } from '../button/Button'

interface DisplayModeSwitcherProps {
	onModeChange: (mode: 'tiles' | 'grid') => void
	hasBg?: boolean
}

export function DisplayModeSwitcher({ onModeChange, hasBg }: DisplayModeSwitcherProps) {
	const [activeMode, setActiveMode] = useState<'tiles' | 'grid'>('tiles')

	const handleTilesClick = () => {
		setActiveMode('tiles')
		onModeChange?.('tiles')
	}

	const handleGridClick = () => {
		setActiveMode('grid')
		onModeChange?.('grid')
	}

	const isGridActive = activeMode === 'grid'
	const isTilesActive = activeMode === 'tiles'

	return (
		<div className='flex'>
			<Button
				isDisabled={false}
				variable={isGridActive ? 'primary' : 'secondary'}
				className={cn(
					'rounded-tl-sm rounded-tr-none rounded-br-none rounded-bl-sm p-[.6rem]',
					hasBg && !isGridActive && 'bg-bg hover:bg-bg'
				)}
				onClick={handleGridClick}
			>
				<LayoutList />
			</Button>
			<Button
				isDisabled={false}
				variable={isTilesActive ? 'primary' : 'secondary'}
				className={cn(
					'rounded-tl-none rounded-tr-sm rounded-br-sm rounded-bl-none p-[.6rem]',
					hasBg && !isTilesActive && 'bg-bg hover:bg-bg'
				)}
				onClick={handleTilesClick}
			>
				<LayoutGrid />
			</Button>
		</div>
	)
}
