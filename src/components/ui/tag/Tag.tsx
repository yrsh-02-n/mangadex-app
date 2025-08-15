import { ReactNode } from 'react'
import cn from 'clsx'
import { ITag } from '@/types/title.types'

interface TagProps {
	tag?: ITag
	children?: ReactNode
	className?: string
}

export function Tag({ children, tag, className }: TagProps) {
	const getTagName = () => {
		if (children) return children
		if (!tag) return 'unknown'

		if (tag?.attributes?.name) {
			const nameValues = Object.values(tag.attributes.name)
			return nameValues[0] || 'Unknown'
		}
	}

	return <div className={cn('bg-black/70 text-white px-[.5rem] py-[.2rem] rounded', className)}>{getTagName()}</div>
}
