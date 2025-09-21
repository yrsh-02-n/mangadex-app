import { InfiniteData } from '@tanstack/react-query'
import dynamic from 'next/dynamic'

import { SkeletonLoader } from '@/components/ui/skeletonLoader/SkeletonLoader'

import { MangaListResponse } from '@/types/api.types'

const DynamicSearchBlock = dynamic(() => import('./SearchBlock').then(mod => mod.SearchBlock), {
	ssr: false,
	loading: () => (
		<div className='grid grid-cols-3 gap-[1rem] mb-[2rem] w-full max-lg:grid-cols-2 max-md:grid-cols-1'>
			<SkeletonLoader
				count={6}
				className='w-full h-[2.5rem]'
			/>{' '}
		</div>
	)
})

interface SearchBlockProps {
	data: InfiniteData<MangaListResponse, unknown> | undefined
}

export function DynSearchBlock({ data }: SearchBlockProps) {
	return <DynamicSearchBlock data={data} />
}
