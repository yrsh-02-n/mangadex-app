import Link from 'next/link'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { ITag } from '@/types/title.types'

interface TagProps {
	tag?: ITag
	children?: ReactNode
	className?: string
	href?: string
}

export function Tag({ children, tag, className, href }: TagProps) {
	const getTagName = () => {
		if (children) return children
		if (!tag) return 'Неизвестный тег'

		if (tag?.attributes?.name) {
			const nameValues = Object.values(tag.attributes.name)
			return nameValues[0] || 'Неизвестный тег'
		}
		return 'Неизвестный тег'
	}

	const content = (
		<span className={twMerge('bg-black/70 text-white px-[.5rem] py-[.2rem] rounded', className)}>
			{getTagName()}
		</span>
	)

	if (href) {
		return <Link href={href}>{content}</Link>
	}

	return content
}
