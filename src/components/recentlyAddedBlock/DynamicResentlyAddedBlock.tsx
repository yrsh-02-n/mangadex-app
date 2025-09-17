'use client'

import dynamic from 'next/dynamic'

import { SkeletonLoader } from '../ui/skeletonLoader/SkeletonLoader'

const DynRecentlyAddedBlock = dynamic(
	() => import('./RecentlyAddedBlock').then(mod => mod.RecentlyAddedBlock),
	{
		ssr: false,
		loading: () => (
			<div className='w-full'>
				<SkeletonLoader
					count={1}
					className='w-full h-[32rem]'
				/>
			</div>
		)
	}
)

export function DynamicResentlyAddedBlock() {
	return (
		<div className='w-full min-h-[18rem]'>
			<DynRecentlyAddedBlock />
		</div>
	)
}
