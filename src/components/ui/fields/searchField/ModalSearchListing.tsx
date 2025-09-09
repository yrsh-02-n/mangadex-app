import { useEffect, useRef } from 'react'

import { GridCard } from '@/components/titleCards/GridCard'
import { SearchCard } from '@/components/titleCards/SearchCard'

import { useSearchModalState } from '@/store/ui.store'

import { useSearchAutocomplete } from '@/hooks/useSearchAutocomplete'

import { Modal } from '../../modal/Modal'

// ModalSearchListing.tsx
export function ModalSearchListing() {
	const { searchTerm, isSearchModalOpen, closeSearchModal } = useSearchModalState()
	const { data, isLoading, error } = useSearchAutocomplete(searchTerm)
	const modalRef = useRef<HTMLDivElement>(null)

	// Auto open/close modal by value length
	useEffect(() => {
		const { openSearchModal, closeSearchModal } = useSearchModalState.getState()
		if (searchTerm.length >= 4) {
			openSearchModal()
		} else {
			closeSearchModal()
		}
	}, [searchTerm])

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
				closeSearchModal()
			}
		}

		if (isSearchModalOpen) {
			document.addEventListener('mousedown', handleClick)
		}

		return () => {
			document.removeEventListener('mousedown', handleClick)
		}
	}, [isSearchModalOpen, closeSearchModal])

	if (!isSearchModalOpen || searchTerm.length < 4) {
		return null
	}

	const mangaList = data?.data || []

	return (
		<Modal
			ref={modalRef}
			isShow={isSearchModalOpen}
      className='max-lg:hidden'
		>
			{mangaList.map(title => (
				<SearchCard
					key={title.id}
					attributes={title.attributes}
					id={title.id}
					relationships={title.relationships}
				/>
			))}
		</Modal>
	)
}
