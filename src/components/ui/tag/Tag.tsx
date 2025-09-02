import Link from 'next/link'
import { ReactNode, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { useSearchStore } from '@/store/search.store'

import { getLocalizedTag } from '@/utils/getLocalizedTag'

import { ITag } from '@/types/title.types'

export enum TagStatus {
	Initial = 'initial',
	Included = 'included',
	Excluded = 'excluded'
}

interface TagProps {
	tag?: ITag
	tagId?: string
	children?: ReactNode
	className?: string
	href?: string
	isButton?: boolean
	onStatusChange?: (tagId: string, status: TagStatus) => void
}

export function Tag({ children, tag, className, href, isButton, onStatusChange, tagId }: TagProps) {
	const [status, setStatus] = useState<TagStatus>(TagStatus.Initial)

	const includedTags = useSearchStore(state => state.selectedIncludedTags)
	const excludedTags = useSearchStore(state => state.selectedExcludedTags)

	// sync local state with global state
	useEffect(() => {
		if (!tagId) return

		if (includedTags.includes(tagId)) {
			setStatus(TagStatus.Included)
		} else if (excludedTags.includes(tagId)) {
			setStatus(TagStatus.Excluded)
		} else {
			setStatus(TagStatus.Initial)
		}
	}, [tagId, includedTags, excludedTags])

	// change tag status
	const handleClick = () => {
		if (!tagId) return
		const nextState = (() => {
			switch (status) {
				case TagStatus.Initial:
					return TagStatus.Included
				case TagStatus.Included:
					return TagStatus.Excluded
				case TagStatus.Excluded:
					return TagStatus.Initial
			}
		})()

		setStatus(nextState)
		onStatusChange?.(tagId, nextState)
	}

	const getStatusClass = () => {
		switch (status) {
			case TagStatus.Initial:
				return 'bg-black border-black border-solid border-2'
			case TagStatus.Included:
				return 'bg-green-700 border-green-400 border-solid border-2'
			case TagStatus.Excluded:
				return 'bg-red-700 border-accent border-dashed border-2'
		}
	}
	//

	const getTagName = () => {
		if (children) return children
		if (!tag) return 'Неизвестный тег'

		if (tag?.attributes?.name) {
			const nameValues = Object.values(tag.attributes.name)
			const displayTagName = getLocalizedTag(nameValues[0])
			return displayTagName || 'Неизвестный тег'
		}
		return 'Неизвестный тег'
	}

	const content = !isButton ? (
		<span className={twMerge('bg-black/70 text-white px-[.5rem] py-[.2rem] rounded', className)}>
			{getTagName()}
		</span>
	) : (
		<button
			onClick={handleClick}
			className={twMerge('bg-black/70 text-white px-[.5rem] py-[.2rem] rounded', getStatusClass())}
		>
			{getTagName()}
		</button>
	)

	// if (href) {
	// 	return <Link href={href}>{content}</Link>
	// }

	return content
}
