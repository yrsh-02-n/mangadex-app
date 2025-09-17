import dayjs from 'dayjs'
import relativeDate from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'

dayjs.extend(relativeDate)
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
	relativeTime: {
		future: 'через %s',
		past: '%s назад',
		s: 'несколько секунд',
		m: 'минуту',
		mm: '%d минут',
		h: 'час',
		hh: '%d часа',
		d: 'день',
		dd: '%d дня',
		M: 'месяц',
		MM: '%d месяцев',
		y: 'год',
		yy: '%d года'
	}
})

export function transformDate(createdAt: string): string {
	return dayjs(createdAt).fromNow()
}
