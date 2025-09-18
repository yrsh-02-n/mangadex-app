import { InfiniteData, QueryKey, useInfiniteQuery, useQuery } from '@tanstack/react-query'

import { mangaService } from '@/services/manga.service'
import { MangaListResponse } from '@/types/api.types'

export const usePopularRuManga = () => {
	return useInfiniteQuery<
		MangaListResponse,
		Error,
		InfiniteData<MangaListResponse, number>,
		QueryKey,
		number
	>({
		queryKey: ['getPopularRuManga'],
		queryFn: async ({ pageParam = 0 }) => {
			const limit = 18

			const paginationParams = {
				limit,
				offset: pageParam as number
			}

			const response = await mangaService.getMostPopularRu(paginationParams)
			return response.data
		},
		getNextPageParam: (lastPage, allPages) => {
			const totalLoaded = allPages.reduce((sum, page) => sum + page.data.length, 0)
			return totalLoaded < lastPage.total ? totalLoaded : undefined
		},
		initialPageParam: 0
	})
}
