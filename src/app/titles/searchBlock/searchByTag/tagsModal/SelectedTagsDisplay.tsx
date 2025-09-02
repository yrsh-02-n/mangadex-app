import { X } from 'lucide-react'

import { useSearchStore } from '@/store/search.store'

import { getLocalizedTag } from '@/utils/getLocalizedTag'

import { ITag } from '@/types/title.types'

interface SelectedTagsDisplayProps {
	tagsData: ITag[]
	onRemoveTag?: (tagId: string, type: 'included' | 'excluded') => void
}

export function SelectedTagsDisplay({ tagsData, onRemoveTag }: SelectedTagsDisplayProps) {
	const includedTags = useSearchStore(state => state.selectedIncludedTags)
	const excludedTags = useSearchStore(state => state.selectedExcludedTags)
	const setIncludedTags = useSearchStore(state => state.setSelectedIncludedTags)
	const setExcludedTags = useSearchStore(state => state.setSelectedExcludedTags)

	const getTagName = (id: string) => {
		const tag = tagsData.find(t => t.id === id)
		return tag ? getLocalizedTag(tag.attributes.name.en) : ''
	}

	const handleRemoveTag = (tagId: string, type: 'included' | 'excluded') => {
		if (type === 'included') {
			setIncludedTags(includedTags.filter(id => id !== tagId))
		} else {
			setExcludedTags(excludedTags.filter(id => id !== tagId))
		}
		onRemoveTag?.(tagId, type)
	}

	if (includedTags.length === 0 && excludedTags.length === 0) {
		return null
	}

	return (
		<div className='flex flex-wrap gap-1 absolute inset-0 items-center pl-3 pointer-events-none'>
			<div className='flex flex-wrap gap-1 absolute inset-0 items-center pl-3 pointer-events-none'>
				{includedTags.length > 0 && (
					<span className='bg-green-700 border-green-400 border-2 px-[.4rem] py-[.140rem] rounded text-[85%] font-bold flex items-center gap-1 pointer-events-auto max-w-[150px]'>
						<span>+</span>
						<span>{includedTags.length}</span>
					</span>
				)}

				{excludedTags.length > 0 && (
					<span className='bg-red-700 border-2 border-accent border-dashed px-[.4rem] py-[.140rem] text-[85%] font-bold rounded flex items-center gap-1 pointer-events-auto'>
						<span>+</span>
						<span>{excludedTags.length}</span>
					</span>
				)}
			</div>
		</div>
	)
}
