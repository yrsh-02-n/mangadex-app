'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { SlugHeading } from './SlugHeading/SlugHeading'
import { mangaService } from '@/services/manga.service'
import { SlugInfo } from './SlugInfo/SlugInfo'

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

	return (
		<div>
			<SlugHeading data={data} />
      <SlugInfo data={data} />
		</div>
	)
}
