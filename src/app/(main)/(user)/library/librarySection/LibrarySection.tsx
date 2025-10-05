'use client'

import { useState } from 'react'

import { ListingContainer } from '@/components/listingContainer/ListingContainer'
import { GridCard } from '@/components/titleCards/GridCard'
import { TileCard } from '@/components/titleCards/TileCard'
import { DisplayModeSwitcher } from '@/components/ui/DisplayModeSwitcher/DisplayModeSwitcher'
import { SkeletonLoader } from '@/components/ui/skeletonLoader/SkeletonLoader'

import { ITitle } from '@/types/title.types'

interface Props {
	isLoading: boolean
	titles: ITitle[]
	isError: boolean
	onModeChange?: (mode: 'tiles' | 'grid') => void
}

export function LibrarySection({ isLoading, titles, isError, onModeChange }: Props) {
	const [displayMode, setDisplayMode] = useState<'tiles' | 'grid'>('tiles')

	return (
		<div>
			{!isLoading ? (
				<ListingContainer
					onModeChange={setDisplayMode}
					displayMode={displayMode}
				>
					{displayMode === 'tiles'
						? titles.map((title, index) => (
								<TileCard
									key={index}
									attributes={title.attributes}
									id={title.id}
									relationships={title.relationships}
								/>
							))
						: titles.map((title, index) => (
								<GridCard
									key={index}
									attributes={title.attributes}
									id={title.id}
									relationships={title.relationships}
								/>
							))}
				</ListingContainer>
			) : (
				<ListingContainer
					onModeChange={setDisplayMode}
					displayMode={displayMode}
				>
					<SkeletonLoader
						count={18}
						className='h-[22rem]'
					/>
				</ListingContainer>
			)}

			{isError && (
				<div className='flex flex-col items-center'>
					<p className='text-xl'>Ничего не загрузилось.</p>
					<p>Попробуйте обновить страницу.</p>
				</div>
			)}
		</div>
	)
}
