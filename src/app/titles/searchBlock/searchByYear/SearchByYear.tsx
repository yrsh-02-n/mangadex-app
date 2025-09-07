import { useEffect, useRef, useState } from 'react'

import { DefaultField } from '@/components/ui/fields/DefaultField'
import { Modal } from '@/components/ui/modal/Modal'

import { useSearchStore } from '@/store/search.store'

import { YearSlider } from './yearSlider/YearSlider'

export function SearchByYear() {
	const [isShow, setIsShow] = useState(false)
	const buttonRef = useRef<HTMLButtonElement>(null)
	const modalRef = useRef<HTMLDivElement>(null)
	const [fieldKey, setFieldKey] = useState(0)
	const { selectedYear, setSelectedYear } = useSearchStore()

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (
				buttonRef.current &&
				!buttonRef.current.contains(event.target as Node) &&
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				setIsShow(false)
			}
		}

		if (isShow) {
			document.addEventListener('mousedown', handleClick)
		}

		return () => {
			document.removeEventListener('mousedown', handleClick)
		}
	}, [isShow])

	// clear field
	const handleResetField = (e: React.MouseEvent) => {
		e.stopPropagation() // not open modal

		// Сlear store
		useSearchStore.getState().setSelectedYear(undefined)
		setSelectedYear(undefined)
		setFieldKey(prev => prev + 1)
	}

	const yearValueHandler = (year: number) => {
		setSelectedYear(year)
	}

	return (
		<div className='w-full relative'>
			<p className='mb-[.4rem]'>Год выхода</p>
			<button
				ref={buttonRef}
				className='w-full relative'
				onClick={() => setIsShow(!isShow)}
			>
				<DefaultField
					key={fieldKey}
					type='text'
					placeholder='Выбрать год'
					variant='select'
					value={selectedYear?.toString() || ''}
					onClick={handleResetField}
					readOnly={false}
					isEmpty={!!selectedYear}
					onChange={e => {
						const year = parseInt(e.target.value)
						if (!isNaN(year)) {
							setSelectedYear(year)
						}
					}}
				/>
			</button>
			{isShow && (
				<Modal
					ref={modalRef}
					isShow={isShow}
					className='h-[3rem]'
				>
					<div className='flex flex-col justify-end h-full'>
						<YearSlider
							value={selectedYear}
							onChange={yearValueHandler}
						/>
					</div>
				</Modal>
			)}
		</div>
	)
}
