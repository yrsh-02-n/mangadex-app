import { useEffect, useRef, useState } from 'react'

import { DefaultField } from '@/components/ui/fields/DefaultField'
import { Modal } from '@/components/ui/modal/Modal'

import { useSearchStore } from '@/store/search.store'

import { useClickOutside } from '@/hooks/useClickOutside'

import { SelectedTagsDisplay } from './tagsModal/SelectedTagsDisplay'
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

	const dropdownRef = useClickOutside<HTMLDivElement>(() => setIsShow(false), [isShow])

	// clear field
	const handleResetField = (e: React.MouseEvent) => {
		e.stopPropagation() // not open modal

		// Сlear store
		useSearchStore.getState().setSelectedIncludedTags([])
		useSearchStore.getState().setSelectedExcludedTags([])
	}

	return (
		<div
			className='w-full relative'
			ref={dropdownRef}
		>
			<p className='mb-[.4rem]'>Фильтр по тегам</p>
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
					readOnly
				/>
				<SelectedTagsDisplay tagsData={tagsData} />
			</button>
			{isShow && (
				<Modal
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
				</Modal>
			)}
		</div>
	)
}
