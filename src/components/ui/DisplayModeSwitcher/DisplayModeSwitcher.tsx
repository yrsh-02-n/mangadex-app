'use client'

import { LayoutGrid, LayoutList } from 'lucide-react'
import { useState } from 'react'

import { Button } from '../button/Button'

interface DisplayModeSwitcherProps {
	onModeChange: (mode: 'tiles' | 'grid') => void
}

export function DisplayModeSwitcher({ onModeChange }: DisplayModeSwitcherProps) {
	const [activeMode, setActiveMode] = useState<'tiles' | 'grid'>('tiles')

	const handleTilesClick = () => {
		setActiveMode('tiles')
		onModeChange?.('tiles')
	}

	const handleGridClick = () => {
		setActiveMode('grid')
		onModeChange?.('grid')
	}

	return (
		<div>
			<Button
				isDisabled={false}
				variable={activeMode === 'tiles' ? 'secondary' : 'primary'}
				className='rounded-tl-sm rounded-tr-none rounded-br-none rounded-bl-sm'
				onClick={handleGridClick}
			>
				<LayoutList />
			</Button>
			<Button
				isDisabled={false}
				variable={activeMode === 'grid' ? 'secondary' : 'primary'}
				className='rounded-tl-none rounded-tr-sm rounded-br-sm rounded-bl-none'
				onClick={handleTilesClick}
			>
				<LayoutGrid />
			</Button>
		</div>
	)
}
