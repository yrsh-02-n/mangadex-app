import { MangaRes, MangaResponse } from '@/types/api.types'

export function SlugChapters({ data }: MangaRes) {
	const mangaData = data?.data
	return <div className='bg-primary rounded p-[1.5rem]'>Chapters</div>
}
