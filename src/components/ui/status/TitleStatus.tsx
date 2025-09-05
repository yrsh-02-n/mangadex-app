import cn from 'clsx'

import { getLocalizedStatus } from '@/utils/getLocalizedStatus'

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
				{attributes.status === Status.ONGOING && getLocalizedStatus(Status.ONGOING)}
				{attributes.status === Status.CANCELLED && getLocalizedStatus(Status.CANCELLED)}
				{attributes.status === Status.COMPLETED && getLocalizedStatus(Status.COMPLETED)}
				{attributes.status === Status.HIATUS && getLocalizedStatus(Status.HIATUS)}
			</span>
		</div>
	)
}
