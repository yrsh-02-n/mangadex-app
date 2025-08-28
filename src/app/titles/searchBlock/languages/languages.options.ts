import { LANGS_TRANSLATIONS } from '@/constants/translations/langsTranslations.constants'

export const languagesOptions = Object.entries(LANGS_TRANSLATIONS).map(([code, label]) => ({
	value: code,
	label: label
}))
