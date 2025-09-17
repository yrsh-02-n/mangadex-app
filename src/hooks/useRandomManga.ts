// hooks/useRandomManga.ts
import { useQuery } from '@tanstack/react-query'

import { mangaService } from '@/services/manga.service'
import { MangaListResponse } from '@/types/api.types'

export const useRandomManga = () => {
	return useQuery<MangaListResponse, Error>({
		queryKey: ['getRandomManga'],
		queryFn: async () => {
			const limit = 100
			const offset = 0

			const paginationParams = {
				limit,
				offset
			}

			const response = await mangaService.getAll(paginationParams)
			return response.data
		},
		staleTime: 1000 * 60 * 5 // 5 minutes cache
	})
}
