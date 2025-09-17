import { useQuery } from '@tanstack/react-query'

import { mangaService } from '@/services/manga.service'

export const useChaptersById = (slug: string) => {
	return useQuery({
		queryKey: ['ChaptersById', slug as string],
		queryFn: () => {
			if (!slug) throw new Error('ID не найден')
			return mangaService.getChaptersById(slug as string).then(res => res.data)
		},
		enabled: !!slug,
		retry: false
	})
}
