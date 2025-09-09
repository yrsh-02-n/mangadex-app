'use client'

import { Search } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useSearchStore } from '@/store/search.store'
import { useSearchModalState } from '@/store/ui.store'

import { DefaultField } from '../DefaultField'

import { ModalSearchListing } from './ModalSearchListing'

export function SearchField() {
	const { selectedTitle, setSelectedTitle, applyFilters } = useSearchStore()
	const { closeSearchModal, setSearchTerm } = useSearchModalState()
	const router = useRouter()
	const pathname = usePathname()
	const isSearchPage = pathname?.includes('/search') || false

	// sync selectedTitle with searchTerm
	useEffect(() => {
		setSearchTerm(selectedTitle || '')
	}, [selectedTitle, setSearchTerm])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (selectedTitle && selectedTitle.trim()) {
			closeSearchModal()
			router.push(`/search?title=${encodeURIComponent(selectedTitle)}`)
		}
		isSearchPage && applyFilters()
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='relative w-full'
		>
			<DefaultField
				placeholder='Поиск манги по названию'
				icon={Search}
				variant='search'
				size='sm'
				fullwidth
				readOnly={false}
				value={selectedTitle}
				onChange={e => setSelectedTitle(e.target.value)}
			/>
			<ModalSearchListing />
		</form>
	)
}
