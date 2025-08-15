import { IMangaAttributes } from '@/types/title.types'

export const getTags = (attributes: IMangaAttributes) => {
	const tags = attributes?.tags
	return tags
}
