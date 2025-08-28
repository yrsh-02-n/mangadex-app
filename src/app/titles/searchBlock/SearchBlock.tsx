import { InfiniteData } from '@tanstack/react-query'

import { Button } from '@/components/ui/button/Button'

import { useSearchStore } from '@/store/search.store'

import { SearchByOriginLang } from './languages/searchByOriginLang/SearchByOriginLang'
import { SearchByDemographic } from './searchByDemographic/SearchByDemographic'
import { MangaListResponse } from '@/types/api.types'

interface SearchBlockProps {
	data: InfiniteData<MangaListResponse, unknown> | undefined
}

export function SearchBlock({ data }: SearchBlockProps) {
	const { applyFilters, resetSelectedFilters } = useSearchStore()

	return (
		<>
			<div className='flex gap-[1rem] mb-[3rem] w-full'>
				<SearchByDemographic />
				<SearchByOriginLang />
			</div>
			<div>
				<Button
					variable='primary'
					onClick={applyFilters}
				>
					Искать
				</Button>
				<Button
					variable='secondary'
					onClick={resetSelectedFilters}
				>
					Сбросить фильтры
				</Button>
			</div>
		</>
	)
}
