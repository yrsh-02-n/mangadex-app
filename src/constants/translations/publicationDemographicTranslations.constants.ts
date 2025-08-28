import { PublicationDemographic } from '@/types/enums'

export const DEMOGRAPHIC_TRANSLATIONS: Record<PublicationDemographic, string> = {
	[PublicationDemographic.SHOUNEN]: 'Сёнэн (Юноши 12+)',
	[PublicationDemographic.SHOUJO]: 'Сёдзё (Девушки 12+)',
	[PublicationDemographic.JOSEI]: 'Дзёсэй (Мужчины 18+)',
	[PublicationDemographic.SEINEN]: 'Сэйнэн (Женщины 18+)'
}
