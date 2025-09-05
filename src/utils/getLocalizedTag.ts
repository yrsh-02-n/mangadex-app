import { TAG_TRANSLATIONS } from '@/constants/translations/tagTranslation.constants'

export const getLocalizedTag = (englishName: string): string => {
	return TAG_TRANSLATIONS[englishName] || englishName
}
