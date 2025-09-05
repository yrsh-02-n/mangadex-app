import { STATUS_TRANSLATIONS } from '@/constants/translations/statusTranslations.constants'

import { Status } from '@/types/enums'

export const getLocalizedStatus = (status: Status): string => {
	return STATUS_TRANSLATIONS[status] || status
}
