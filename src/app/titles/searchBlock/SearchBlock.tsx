import { InfiniteData } from '@tanstack/react-query'

import { SearchByDemographic } from './searchByDemographic/SearchByDemographic'
import { MangaListResponse } from '@/types/api.types'

interface SearchBlockProps {
	data: InfiniteData<MangaListResponse, unknown> | undefined
}

export function SearchBlock({ data }: SearchBlockProps) {
	return (
		<div className='mb-[3rem]'>
			<SearchByDemographic />
		</div>
	)
}
