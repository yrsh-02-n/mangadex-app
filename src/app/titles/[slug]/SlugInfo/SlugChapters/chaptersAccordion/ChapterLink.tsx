import { Clock } from 'lucide-react'
import Link from 'next/link'
import Flag from 'react-flagkit'
import { twMerge } from 'tailwind-merge'

import { FLAGS } from '@/constants/flags.constants'

import { transformDate } from '@/utils/transformDate'

import { IChapter } from '@/types/chapters.types'

interface IChapterLink {
	chapter: IChapter
	listCard?: boolean
}

export default function ChapterLink({ chapter, listCard }: IChapterLink) {
	const updatedTime = chapter.attributes.updatedAt
	const daysAgo = transformDate(updatedTime as string)

	return (
		<div className={twMerge('flex justify-between items-center max-s:flex-col max-s:items-start ')}>
			<Link
				href={'https://mangadex.org/chapter/' + chapter.id}
				target='blank_'
				title={`Глава ${chapter.attributes.chapter} ${chapter.attributes.title}`}
				className='hover:text-accent transition-colors duration-200'
			>
				<li className='items-center flex'>
					<div className='flex gap-[.5rem] mb-[.5rem] line-clamp-1'>
						{chapter.attributes?.translatedLanguage ? (
							<Flag country={FLAGS[chapter.attributes.translatedLanguage]} />
						) : null}
						<span className='line-clamp-1'>
							{chapter.attributes?.title ? ` ${chapter.attributes.title}` : 'Без заголовка'}
						</span>
					</div>
				</li>
			</Link>
			<div className='flex gap-[.5rem] items-center shrink-0 text-white/70 mt-[-8px] max-s:hidden'>
				<Clock size={16} />
				{daysAgo}
			</div>
		</div>
	)
}
