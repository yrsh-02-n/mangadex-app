import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { RadioList } from '../ui/radioList/RadioList'

import { ReadingStatus } from '@/types/enums'

interface Props {
	isShow: boolean
}

const statusOptions = [
	{ value: ReadingStatus.READING, label: 'Читаю' },
	{ value: ReadingStatus.PLANNED, label: 'В планах' },
	{ value: ReadingStatus.COMPLETED, label: 'Прочитано' },
	{ value: ReadingStatus.PAUSED, label: 'Отложено' },
	{ value: ReadingStatus.DROPPED, label: 'Брошено' }
]

export function SelectLibrarySection({ isShow }: Props) {
	const [selectedStatus, setSelectedStatus] = useState<string>('')

	return (
		<div
			className={twMerge(
				'absolute bg-primary py-[.5rem] top-[2.74rem] left-0 right-0 rounded-b hidden',
				isShow && 'block'
			)}
		>
			<RadioList
				options={statusOptions}
				selected={selectedStatus}
				onChange={setSelectedStatus}
			/>
		</div>
	)
}
