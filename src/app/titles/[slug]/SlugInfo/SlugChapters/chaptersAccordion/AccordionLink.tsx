import Link from 'next/link'
import Flag from 'react-flagkit'

import { FLAGS } from '@/constants/flags.constants'

import { IChapter } from '@/types/chapters.types'

interface IAccordionLink {
	chapter: IChapter
}

export default function AccordionLink({ chapter }: IAccordionLink) {
	return (
		<Link
			href={'https://mangadex.org/chapter/' + chapter.id}
			target='blank_'
			title={`Глава ${chapter.attributes.chapter} ${chapter.attributes.title}`}
			className='hover:text-accent transition-colors duration-200'
		>
			<li className=''>
				<div className='flex gap-[.5rem] mb-[.5rem]'>
					{chapter.attributes?.translatedLanguage ? (
						<Flag country={FLAGS[chapter.attributes.translatedLanguage]} />
					) : null}
					{chapter.attributes?.title ? ` ${chapter.attributes.title}` : 'Без заголовка'}
				</div>
			</li>
		</Link>
	)
}
