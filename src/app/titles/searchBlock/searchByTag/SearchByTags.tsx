import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button/Button'
import { DefaultField } from '@/components/ui/fields/DefaultField'

import { TagsModal } from './TagsModal'

export function SearchByTags() {
	const [isShow, setIsShow] = useState(false)
	const buttonRef = useRef<HTMLButtonElement>(null)
	const modalRef = useRef<HTMLDivElement>(null)

  // close modal outside and by click on input
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

	return (
		<div className='w-full relative'>
			<p className='mb-[.8rem]'>Фильтр по тегам</p>
			<button
				ref={buttonRef}
				className='w-full relative'
				onClick={() => setIsShow(!isShow)}
			>
				<DefaultField
					type='text'
					placeholder='Включить/Исключить теги'
					variant='select'
				/>
			</button>
			{isShow && (
				<TagsModal
					ref={modalRef}
					isShow={isShow}
				>
					<Button variable='primary'>test</Button>
				</TagsModal>
			)}
		</div>
	)
}
