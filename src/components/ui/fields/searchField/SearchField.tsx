'use client'

import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { useSearchStore } from '@/store/search.store'

import { DefaultField } from '../DefaultField'

export function SearchField() {
	const { selectedTitle, setSelectedTitle, applyFilters } = useSearchStore()
	const router = useRouter()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		applyFilters()
		if (selectedTitle && selectedTitle.trim()) {
			router.push(`/search?title=${encodeURIComponent(selectedTitle)}`)
		}
	}

	return (
		<form onSubmit={handleSubmit} className='w-full'>
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
		</form>
	)
}
