import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import ChaptersAccordion from './chaptersAccordion/ChaptersAccordion'
import { mangaService } from '@/services/manga.service'

export function SlugChapters() {
	const params = useParams()
	const slug = params?.slug

	const { data, error } = useQuery({
		queryKey: ['ChaptersById', slug as string],
		queryFn: () => {
			if (!slug) throw new Error('ID не найден')
			return mangaService.getChaptersById(slug as string).then(res => res.data)
		},
		enabled: !!slug,
		retry: false
	})

	return data ? (
		<div className='bg-primary rounded p-[1.5rem]'>
			<div>
				<p className='text-xl mb-[1rem]'>Главы</p>
				<ChaptersAccordion data={data} />
			</div>
		</div>
	) : (
		<div>{error?.message}</div>
	)
}
