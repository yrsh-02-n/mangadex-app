import { useLatestUpdates } from '@/hooks/useLatestUpdates'

import { ChaptersCard } from '../titleCards/ChaptersCard'
import { SkeletonLoader } from '../ui/skeletonLoader/SkeletonLoader'

export function LatestUpdatesBlock() {
	const { data, isLoading } = useLatestUpdates()

	// titles
	const allTitles = data?.pages.flatMap(page => page.data) || []

	return !isLoading ? (
		<div className='grid grid-cols-3 gap-[1rem] max-xl:grid-cols-1'>
			<div className='flex flex-col gap-[1rem] bg-primary p-[1rem] rounded'>
				{allTitles?.slice(0, 4).map((title, index) => (
					<ChaptersCard
						key={index}
						attributes={title.attributes}
						id={title.id}
						relationships={title.relationships}
					/>
				))}
			</div>
			<div className='flex flex-col gap-[1rem] bg-primary p-[1rem] rounded max-xl:hidden'>
				{allTitles?.slice(5, 9).map((title, index) => (
					<ChaptersCard
						key={index}
						attributes={title.attributes}
						id={title.id}
						relationships={title.relationships}
					/>
				))}
			</div>
			<div className='flex flex-col gap-[1rem] bg-primary p-[1rem] rounded max-xl:hidden'>
				{allTitles?.slice(10, 14).map((title, index) => (
					<ChaptersCard
						key={index}
						attributes={title.attributes}
						id={title.id}
						relationships={title.relationships}
					/>
				))}
			</div>
		</div>
	) : (
		<div className='grid grid-cols-3 gap-[1rem] h-[20rem]'>
			<SkeletonLoader
				count={3}
				className='h-full'
			/>
		</div>
	)
}
