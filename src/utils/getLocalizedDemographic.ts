import { DEMOGRAPHIC_TRANSLATIONS } from '@/constants/translations/publicationDemographicTranslations.constants'

import { PublicationDemographic } from '@/types/enums'

export const getLocalizedDemographic = (japTerm: PublicationDemographic): string => {
	return DEMOGRAPHIC_TRANSLATIONS[japTerm] || japTerm
}
