import { InfiniteData } from '@tanstack/react-query'
import dynamic from 'next/dynamic'

import { MangaListResponse } from '@/types/api.types'

const DynamicSearchBlock = dynamic(() => import('./SearchBlock').then(mod => mod.SearchBlock), {
	ssr: false
})

interface SearchBlockProps {
	data: InfiniteData<MangaListResponse, unknown> | undefined
}

export function DynSearchBlock({ data }: SearchBlockProps) {
	return <DynamicSearchBlock data={data} />
}
