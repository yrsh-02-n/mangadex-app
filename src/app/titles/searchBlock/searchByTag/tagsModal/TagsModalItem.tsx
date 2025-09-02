import { ReactNode } from 'react'

import { Tag, TagStatus } from '@/components/ui/tag/Tag'

import { useSearchStore } from '@/store/search.store'

import { getLocalizedTag } from '@/utils/getLocalizedTag'

import { ITag } from '@/types/title.types'

interface Props {
	data: ITag[]
	groupTitle: ReactNode
	tagGroup: string
}

export function TagsModalItem({ data, groupTitle, tagGroup }: Props) {
	const includedTags = useSearchStore(state => state.selectedIncludedTags)
	const excludedTags = useSearchStore(state => state.selectedExcludedTags)
	const setIncludedTags = useSearchStore(state => state.setSelectedIncludedTags)
	const setExcludedTags = useSearchStore(state => state.setSelectedExcludedTags)

	const handleStatusChange = (tagId: string, status: TagStatus) => {
		switch (status) {
			case TagStatus.Included:
				setIncludedTags([...includedTags, tagId])
				setExcludedTags(excludedTags.filter(id => id !== tagId))
				break
			case TagStatus.Excluded:
				setExcludedTags([...excludedTags, tagId])
				setIncludedTags(includedTags.filter(id => id !== tagId))
				break
			case TagStatus.Initial:
				setIncludedTags(includedTags.filter(id => id !== tagId))
				setExcludedTags(excludedTags.filter(id => id !== tagId))
				break
		}
	}

	return (
		<div className='max-w-full mb-[2rem] last:mb-0'>
			<p className='text-lg mb-[1rem]'>{groupTitle}</p>
			<div className='flex gap-[.5rem] flex-wrap'>
				{data
					.filter(tag => tag.attributes.group === tagGroup)
					.map(tagButton => (
						<Tag
							isButton
							key={tagButton.id}
							onStatusChange={handleStatusChange}
              tagId={tagButton.id}
						>
							{getLocalizedTag(tagButton.attributes.name.en)}
						</Tag>
					))}
			</div>
		</div>
	)
}
