'use client'

import { useState } from 'react'

import { ListingContainer } from '@/components/listingContainer/ListingContainer'
import { GridCard } from '@/components/titleCards/GridCard'
import { TileCard } from '@/components/titleCards/TileCard'
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
				titles.length > 0 ? (
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
					<div className='text-center py-8'>
						<p className='text-lg'>Раздел пуст</p>  
					</div>
				)
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