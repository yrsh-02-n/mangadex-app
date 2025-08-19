import cn from 'clsx'

import { Status } from '@/types/enums'
import { IMangaAttributes } from '@/types/title.types'

interface ITitleStatus {
	attributes: IMangaAttributes
}

export function TitleStatus({ attributes }: ITitleStatus) {
	return (
		<div className='flex items-center gap-[.5rem] bg-bg/70 text-white px-[.5rem] py-[.2rem] rounded h-fit w-fit'>
			<span
				className={cn(
					'w-[.5rem] h-[.5rem] rounded-full',
					attributes.status === Status.ONGOING && 'bg-green-400',
					attributes.status === Status.CANCELLED && 'bg-red-400',
					attributes.status === Status.COMPLETED && 'bg-blue-400',
					attributes.status === Status.HIATUS && 'bg-yellow-400'
				)}
			/>
			<span>
				{attributes.status === Status.ONGOING && 'Онгоинг'}
				{attributes.status === Status.CANCELLED && 'Отменено'}
				{attributes.status === Status.COMPLETED && 'Завершено'}
				{attributes.status === Status.HIATUS && 'Приостановлено'}
			</span>
		</div>
	)
}
