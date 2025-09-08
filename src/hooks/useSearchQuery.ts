import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'

import { useSearchStore } from '@/store/search.store'

import { mangaService } from '@/services/manga.service'
import { MangaListResponse } from '@/types/api.types'

type QueryKey = readonly [
	'searchManga',
	string[],
	string[],
	string[],
	string[],
	string[],
	string[],
	number | undefined
]

export const useSearchQuery = () => {
	const currentFilters = useSearchStore()

	return useInfiniteQuery<
		MangaListResponse,
		Error,
		InfiniteData<MangaListResponse, number>,
		QueryKey,
		number
	>({
		queryKey: [
			'searchManga',
			currentFilters.appliedDemographics,
			currentFilters.appliedOriginalLangs,
			currentFilters.appliedTranslatedLangs,
			currentFilters.appliedIncludedTags,
			currentFilters.appliedExcludedTags,
			currentFilters.appliedStatus,
			currentFilters.appliedYear ?? undefined
		],
		queryFn: async ({ pageParam = 0, queryKey }) => {
			const limit = 18

			const [
				,
				appliedDemosAtQueryTime,
				appliedOriginLangs,
				appliedTranslatedlLangs,
				appliedIncludedTags,
				appliedExcludedTags,
				appliedStatus,
				appliedYear
			] = queryKey

			const searchParams = {
				publicationDemographic: appliedDemosAtQueryTime,
				originalLanguage: appliedOriginLangs,
				availableTranslatedLanguage: appliedTranslatedlLangs,
				includedTags: appliedIncludedTags,
				excludedTags: appliedExcludedTags,
				status: appliedStatus,
				year: appliedYear
			}

			const paginationParams = {
				limit,
				offset: pageParam
			}

			const response = await mangaService.getBySearchParams(searchParams, paginationParams)
			return response.data
		},
		getNextPageParam: (lastPage, allPages) => {
			const totalLoaded = allPages.reduce((sum, page) => sum + page.data.length, 0)
			return totalLoaded < lastPage.total ? totalLoaded : undefined
		},
		initialPageParam: 0
	})
}
