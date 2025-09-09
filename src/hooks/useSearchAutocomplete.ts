import { useQuery } from '@tanstack/react-query'

import { mangaService } from '@/services/manga.service'
import { MangaListResponse } from '@/types/api.types'

type QueryKey = readonly ['searchAutocompleteByTitle', string | undefined]

export const useSearchAutocomplete = (searchTerm: string) => {
	return useQuery<MangaListResponse, Error, MangaListResponse, QueryKey>({
		queryKey: ['searchAutocompleteByTitle', searchTerm],
		queryFn: async () => {
			if (!searchTerm || searchTerm.length < 3) {
				return {
					result: [],
					data: [],
					total: 0,
					limit: 0,
					offset: 0
				} as unknown as MangaListResponse
			}

			const searchParams = {
				title: searchTerm
			}

			const paginationParams = {
				limit: 10,
				offset: 0
			}

			const response = await mangaService.getBySearchParams(searchParams, paginationParams)
			return response.data
		},
		enabled: !!searchTerm && searchTerm.length >= 4, // only for 4 symbols and more
		staleTime: 1000 * 60 // 1 minute cache
	})
}
