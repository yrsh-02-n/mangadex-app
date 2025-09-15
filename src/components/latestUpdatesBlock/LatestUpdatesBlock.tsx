import { useMemo } from 'react'

import { useEffectScroll } from '@/hooks/useEffectScroll'
import { useLatestupdatesManga } from '@/hooks/useLatestUpdatesManga'

import { GridCard } from '../titleCards/GridCard'

export function LatestUpdatesBlock() {
	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, isError } =
		useLatestupdatesManga()

	// titles
	const allTitles = data?.pages.flatMap(page => page.data) || []
	console.log(allTitles)

	useEffectScroll({
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		scrollElementRef:
			typeof document !== 'undefined'
				? ({
						current: document.getElementById('main-scroll-container')
					} as React.RefObject<HTMLElement | null>)
				: undefined
	})

	console.log(data)

	return (
		<div className='grid grid-cols-3 gap-[1rem]'>
			{allTitles.map((title, index) => (
				<GridCard
					key={index}
					attributes={title.attributes}
					id={title.id}
					relationships={title.relationships}
				/>
			))}
		</div>
	)
}
