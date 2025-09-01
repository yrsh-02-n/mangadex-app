import { InfiniteData } from '@tanstack/react-query'

import { Button } from '@/components/ui/button/Button'

import { useSearchStore } from '@/store/search.store'

import { SearchByOriginLang } from './languages/searchByOriginLang/SearchByOriginLang'
import { SearchByTranslatedLang } from './languages/searchByTranslatedLang/SearchByTranslatedLang'
import { SearchByDemographic } from './searchByDemographic/SearchByDemographic'
import { MangaListResponse } from '@/types/api.types'
import { SearchByTags } from './searchByTag/SearchByTags'

interface SearchBlockProps {
	data: InfiniteData<MangaListResponse, unknown> | undefined
}

export function SearchBlock({ data }: SearchBlockProps) {
	const { applyFilters, resetSelectedFilters } = useSearchStore()

	return (
		<>
			<div className='grid grid-cols-3 gap-[1rem] mb-[3rem] w-full'>
				<SearchByDemographic />
				<SearchByOriginLang />
				<SearchByTranslatedLang />
        <SearchByTags/>
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
