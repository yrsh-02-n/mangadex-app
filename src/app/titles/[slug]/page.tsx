'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { SlugHeading } from './SlugHeading/SlugHeading'
import { mangaService } from '@/services/manga.service'

export default function TitlePage() {
	const params = useParams()
	const slug = params?.slug

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['TitleById', slug as string],
		queryFn: () => {
			if (!slug) throw new Error('ID не найден')
			return mangaService.byId(slug as string).then(res => res.data)
		},
		enabled: !!slug,
		retry: false
	})

	// if (isLoading) {
	// 	return <div>Загрузка...</div>
	// }

	// if (isError) {
	// 	return <div>Ошибка: {error?.message}</div>
	// }

	// if (!data) {
	// 	return <div>Манга не найдена</div>
	// }

	return (
		<div>
			<SlugHeading data={data} />
		</div>
	)
}
