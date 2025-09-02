import { useEffect, useRef, useState } from 'react'

import { DefaultField } from '@/components/ui/fields/DefaultField'

import { useSearchStore } from '@/store/search.store'

import { SelectedTagsDisplay } from './tagsModal/SelectedTagsDisplay'
import { TagsModal } from './tagsModal/TagsModal'
import { TagsModalItem } from './tagsModal/TagsModalItem'
import { mangaService } from '@/services/manga.service'

const tags = await mangaService.getTags()

export function SearchByTags() {
	const [isShow, setIsShow] = useState(false)
	const buttonRef = useRef<HTMLButtonElement>(null)
	const modalRef = useRef<HTMLDivElement>(null)

	const includedTags = useSearchStore(state => state.selectedIncludedTags)
	const excludedTags = useSearchStore(state => state.selectedExcludedTags)
	const [fieldKey, setFieldKey] = useState(0)

	const hasTags = includedTags.length > 0 || excludedTags.length > 0

	// garanted reset feild value by reset btn
	useEffect(() => {
		setFieldKey(prev => prev + 1)
	}, [includedTags, excludedTags])

	const tagsData = tags.data.data

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

	// clear field
	const handleResetField = (e: React.MouseEvent) => {
		e.stopPropagation() // Предотвращаем открытие модалки

		// Очищаем теги в store
		useSearchStore.getState().setSelectedIncludedTags([])
		useSearchStore.getState().setSelectedExcludedTags([])
	}

	return (
		<div className='w-full relative'>
			<p className='mb-[.8rem]'>Фильтр по тегам</p>
			<button
				ref={buttonRef}
				className='w-full relative'
				onClick={() => setIsShow(!isShow)}
			>
				<DefaultField
					key={fieldKey}
					type='text'
					placeholder={!hasTags ? 'Включить / Исключить теги' : ''}
					variant='select'
					isEmpty={hasTags}
					onClick={handleResetField}
				/>
				<SelectedTagsDisplay tagsData={tagsData} />
			</button>
			{isShow && (
				<TagsModal
					ref={modalRef}
					isShow={isShow}
				>
					<TagsModalItem
						data={tagsData}
						tagGroup='format'
						groupTitle='Формат издания'
					/>
					<TagsModalItem
						data={tagsData}
						tagGroup='genre'
						groupTitle='Жанры'
					/>
					<TagsModalItem
						data={tagsData}
						tagGroup='theme'
						groupTitle='Тематика'
					/>
				</TagsModal>
			)}
		</div>
	)
}
