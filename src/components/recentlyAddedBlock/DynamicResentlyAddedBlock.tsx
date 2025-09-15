'use client'

import dynamic from 'next/dynamic'

import { SkeletonLoader } from '../ui/skeletonLoader/SkeletonLoader'

const DynRecentlyAddedBlock = dynamic(
	() => import('./RecentlyAddedBlock').then(mod => mod.RecentlyAddedBlock),
	{
		ssr: false
	}
)

export function DynamicResentlyAddedBlock() {
	return (
		<div className='w-full min-h-[18rem]'>
			<DynRecentlyAddedBlock />
		</div>
	)
}
