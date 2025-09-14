import { ITag } from '@/types/title.types'

interface Props {
	tags: ITag[]
}

export const getLimitedTags = ({ tags }: Props): ITag[] => {
	if (!tags) {
		return []
	}

	if (typeof window === 'undefined') {
		return tags.slice(0, 7)
	}

	if (window.innerWidth <= 750) {
		return tags.slice(0, 2)
	} else if (window.innerWidth <= 740) {
		return tags.slice(0, 2)
	}

	return tags.slice(0, 7)
}
