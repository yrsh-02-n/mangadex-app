import { getArtist, getAuthor } from '@/utils/getAuthors'

import { MangaRes } from '@/types/api.types'

export function AuthorArtist({ data }: MangaRes) {
	const author = getAuthor(data?.data.relationships)
	const artist = getArtist(data?.data.relationships)

	{
		if (author?.name === artist?.name) return <p>{'Автор и художник: ' + author?.name}</p>
		return <p>{'Автор: ' + author?.name + ', ' + 'художник: ' + artist?.name}</p>
	}
}
