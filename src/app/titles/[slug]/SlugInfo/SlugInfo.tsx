import { SlugAttributes } from './SlugAttributes/SlugAttributes'
import { SlugChapters } from './SlugChapters/SlugChapters'
import { MangaRes } from '@/types/api.types'

export function SlugInfo({ data }: MangaRes) {
	return (
		<div className='grid grid-cols-[18rem_auto] gap-[2rem]'>
			<SlugAttributes data={data} />
			<SlugChapters data={data} />
		</div>
	)
}
