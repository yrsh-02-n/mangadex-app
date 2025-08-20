import { getArtist, getAuthor } from '@/utils/getAuthors'

import { MangaResponse } from '@/types/api.types'

interface Props {
	data: MangaResponse | undefined
}

export function AuthorArtist({ data }: Props) {
	const author = getAuthor(data?.data.relationships)
	const artist = getArtist(data?.data.relationships)

	{
		if (author?.name === artist?.name) return <p>{'Автор и художник: ' + author?.name}</p>
		return <p>{'Автор: ' + author?.name + ', ' + 'художник: ' + artist?.name}</p>
	}
}
