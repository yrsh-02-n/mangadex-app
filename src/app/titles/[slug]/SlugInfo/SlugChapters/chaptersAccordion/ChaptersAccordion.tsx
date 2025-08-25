import { Accordion, AccordionItem } from '@heroui/accordion'
import Link from 'next/link'

import { sortStringAsNumberOrLocale } from '@/utils/sortStringAsNumberOrLocale'

import AccordionLink from './AccordionLink'
import { accordionItemClasses } from './styles/accordionItemClasses'
import { ChaptersListResponse } from '@/types/api.types'
import { IChapter } from '@/types/chapters.types'

const groupAndSort = <T,>(
	items: T[],
	getKey: (item: T) => string,
	noGroupValue: string,
	noSortLastValue: string
): Record<string, T[]> => {
	// group
	const grouped = items.reduce(
		(acc, item) => {
			const key = getKey(item) || noGroupValue
			if (!acc[key]) acc[key] = []
			acc[key].push(item)
			return acc
		},
		{} as Record<string, T[]>
	)
	// sort
	for (const key in grouped) {
		grouped[key].sort((a, b) =>
			sortStringAsNumberOrLocale(getKey(a) ?? '', getKey(b) ?? '', noSortLastValue)
		)
	}
	return grouped
}

interface ChaptersAccordionProps {
	data: ChaptersListResponse | undefined
}

export default function ChaptersAccordion({ data }: ChaptersAccordionProps) {
	const chaptersData = data?.data

	if (!chaptersData || chaptersData.length === 0) {
		return <div>Главы не найдены</div>
	}

	// group by volume
	const chaptersByVolume = groupAndSort<IChapter>(
		chaptersData,
		ch => ch.attributes?.volume ?? '',
		'ненумерованный', // value if null/undefined
		'ненумерованный' // end of list
	)

	// sort by keys
	const sortedVolumeKeys = Object.keys(chaptersByVolume).sort((a, b) =>
		sortStringAsNumberOrLocale(a, b, 'ненумерованный')
	)

	return (
		<Accordion
			itemClasses={accordionItemClasses}
			className='px-0'
		>
			{sortedVolumeKeys.map(volumeKey => {
				const chaptersInVolume = chaptersByVolume[volumeKey]

				// group chapters by number inside volume
				const chaptersByChapterNumber = groupAndSort<IChapter>(
					chaptersInVolume,
					ch => ch.attributes?.chapter ?? '',
					'без номера',
					'без номера'
				)

				// sort by numbers inside volume
				const sortedChapterNumberKeys = Object.keys(chaptersByChapterNumber).sort((a, b) =>
					sortStringAsNumberOrLocale(a, b, 'Без номера')
				)

				return (
					<AccordionItem
						key={volumeKey}
						title={`Том ${volumeKey} (${chaptersInVolume.length} глав)`}
						aria-label={`Том ${volumeKey}`}
					>
						<ul>
							{sortedChapterNumberKeys.map(chapterNumberKey => {
								const chaptersWithSameNumber = chaptersByChapterNumber[chapterNumberKey]
								return (
									<li key={chapterNumberKey}>
										<div className='p-[1rem] mt-[1rem] bg-bg/30 rounded'>
											<p className='text-lg mb-[1rem]'>Глава {chapterNumberKey}</p>
											<ul>
												{chaptersWithSameNumber.map(chapter => (
													<AccordionLink
														key={chapter.id}
														chapter={chapter}
													/>
												))}
											</ul>
										</div>
									</li>
								)
							})}
						</ul>
					</AccordionItem>
				)
			})}
		</Accordion>
	)
}
