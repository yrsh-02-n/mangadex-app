import { twMerge } from 'tailwind-merge'

import { RadioList } from '../ui/radioList/RadioList'

import { ReadingStatus } from '@/types/enums'

interface Props {
	isShow: boolean
	selectedStatus: string
	onChange: (value: string) => void
}

const statusOptions = [
	{ value: ReadingStatus.READING, label: 'Читаю' },
	{ value: ReadingStatus.PLANNED, label: 'В планах' },
	{ value: ReadingStatus.COMPLETED, label: 'Прочитано' },
	{ value: ReadingStatus.PAUSED, label: 'Отложено' },
	{ value: ReadingStatus.DROPPED, label: 'Брошено' }
]

export function SelectLibrarySection({ isShow, selectedStatus, onChange }: Props) {
	return (
		<div
			className={twMerge(
				'absolute bg-bg py-[.5rem] top-[2.74rem] left-0 right-0 rounded-b hidden shadow-xl',
				isShow && 'block'
			)}
		>
			<RadioList
				options={statusOptions}
				selected={selectedStatus}
				onChange={onChange}
			/>
		</div>
	)
}
