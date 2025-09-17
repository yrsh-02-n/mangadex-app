'use client'

import dynamic from 'next/dynamic'

import { SkeletonLoader } from '../ui/skeletonLoader/SkeletonLoader'

const DynLatestUpdatesBlock = dynamic(
	() => import('./LatestUpdatesBlock').then(mod => mod.LatestUpdatesBlock),
	{
		ssr: false,
		loading: () => (
			<div className='grid grid-cols-3 gap-[1rem]'>
				<SkeletonLoader
					count={3}
					className='w-full h-[32rem]'
				/>
			</div>
		)
	}
)

export function DynamicLatestUpdatesBlock() {
	return <DynLatestUpdatesBlock />
}
