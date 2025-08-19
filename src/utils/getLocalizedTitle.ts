import { IMangaAttributes } from '@/types/title.types'

export const getLocalizedTitle = (attributes: IMangaAttributes) => {
	const priorities = ['ru', 'en']

	for (const lang of priorities) {
		const altTitle = attributes.altTitles?.find(title => title[lang])?.[lang]
		if (altTitle) return altTitle
	}

	if (attributes.title) {
		if (typeof attributes.title === 'object') {
			for (const lang of priorities) {
				if (attributes.title[lang]) return attributes.title[lang]
			}
		}
	}
	return ''
}
