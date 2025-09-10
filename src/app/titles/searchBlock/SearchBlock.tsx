import { InfiniteData } from '@tanstack/react-query'

import { Button } from '@/components/ui/button/Button'

import { useSearchStore } from '@/store/search.store'

import { SearchByOriginLang } from './languages/searchByOriginLang/SearchByOriginLang'
import { SearchByTranslatedLang } from './languages/searchByTranslatedLang/SearchByTranslatedLang'
import { SearchByDemographic } from './searchByDemographic/SearchByDemographic'
import { SearchByStatus } from './searchByStatus/SearchByStatus'
import { SearchByTags } from './searchByTag/SearchByTags'
import { SearchByYear } from './searchByYear/SearchByYear'
import { MangaListResponse } from '@/types/api.types'

interface SearchBlockProps {
	data: InfiniteData<MangaListResponse, unknown> | undefined
}

export function SearchBlock({ data }: SearchBlockProps) {
	const { applyFilters, resetSelectedFilters } = useSearchStore()

	return (
		<>
			<div className='grid grid-cols-3 gap-[1rem] mb-[2rem] w-full max-lg:grid-cols-2 max-md:grid-cols-1'>
				<SearchByDemographic />
				<SearchByTags />
				<SearchByStatus />
				<SearchByYear />
				<SearchByOriginLang />
				<SearchByTranslatedLang />
			</div>
			<div className='flex gap-[1rem] max-md:mb-[2rem] max-s:flex-wrap'>
				<Button
					variable='primary'
					onClick={applyFilters}
          className='max-md:w-full'
				>
					Искать
				</Button>
				<Button
					variable='secondary'
					onClick={resetSelectedFilters}
          className='max-md:w-full'
				>
					Сбросить фильтры
				</Button>
			</div>
		</>
	)
}
