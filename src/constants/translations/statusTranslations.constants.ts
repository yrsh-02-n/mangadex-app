import { Status } from '@/types/enums'

export const STATUS_TRANSLATIONS: Record<Status, string> = {
	[Status.CANCELLED]: 'Отменено',
	[Status.COMPLETED]: 'Завершено',
	[Status.HIATUS]: 'Приостановлено',
	[Status.ONGOING]: 'Онгоинг'
}
