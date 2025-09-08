import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'

import { useSearchStore } from '@/store/search.store'

import { mangaService } from '@/services/manga.service'
import { MangaListResponse } from '@/types/api.types'

type QueryKey = readonly ['searchMangaByTitle', string | undefined]

export const useSearchQueryByTitle = () => {
	const currentFilters = useSearchStore()

	return useInfiniteQuery<
		MangaListResponse,
		Error,
		InfiniteData<MangaListResponse, number>,
		QueryKey,
		number
	>({
		queryKey: ['searchMangaByTitle', currentFilters.appliedTitle],
		queryFn: async ({ pageParam = 0 }) => {
			const limit = 18

			const searchParams = {
				title: currentFilters.appliedTitle
			}

			const paginationParams = {
				limit,
				offset: pageParam as number
			}

			const response = await mangaService.getBySearchParams(searchParams, paginationParams)
			return response.data
		},
		getNextPageParam: (lastPage, allPages) => {
			const totalLoaded = allPages.reduce((sum, page) => sum + page.data.length, 0)
			return totalLoaded < lastPage.total ? totalLoaded : undefined
		},
		initialPageParam: 0,
		enabled: !!currentFilters.appliedTitle
	})
}
