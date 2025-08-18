import { IMangaAttributes } from '@/types/title.types'

export const getDesription = (attributes: IMangaAttributes) => {
	const priorities = ['ru', 'en']

	if (attributes.description && typeof attributes.description === 'object') {
		for (const lang of priorities) {
			if (attributes.description[lang]) {
				return attributes.description[lang]
			}
		}

		const firstLang = Object.keys(attributes.description)[0]
		if (firstLang) {
			return attributes.description[firstLang]
		}
	}

	return ''
}
