import { useParams } from 'next/navigation'

import { useChaptersById } from '@/hooks/useChaptersById'

import ChaptersAccordion from './chaptersAccordion/ChaptersAccordion'

export function SlugChapters() {
	const params = useParams()
	const slug = params?.slug

	const { data, error } = useChaptersById(slug as string)

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
