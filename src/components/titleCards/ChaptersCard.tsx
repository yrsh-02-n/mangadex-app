import cn from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import { PUBLIC_ROUTES } from '@/config/public-routes.config'

import { useChaptersById } from '@/hooks/useChaptersById'

import { getCoverArt } from '@/utils/getCoverArt'
import { getLocalizedTitle } from '@/utils/getLocalizedTitle'

import ChapterLink from '@/app/(main)/titles/[slug]/SlugInfo/SlugChapters/chaptersAccordion/ChapterLink'
import { ITitle } from '@/types/title.types'

interface IChapterCard extends ITitle {
	className?: string
	chaptersLength?: number
}

export function ChaptersCard({
	attributes,
	id,
	relationships,
	chaptersLength,
	className
}: IChapterCard) {
	// utils
	const title = getLocalizedTitle(attributes)
	const coverUrl = getCoverArt(relationships, id, 'thumbnail')
	const { data } = useChaptersById(id as string)
	const chaptersData = data?.data

	const sortedChapters = chaptersData?.sort((a, b) => {
		const dateA = a.attributes?.createdAt ? new Date(a.attributes.createdAt).getTime() : 0
		const dateB = b.attributes?.createdAt ? new Date(b.attributes.createdAt).getTime() : 0

		return dateB - dateA
	})

	return (
		<div>
			<div
				className={twMerge(
					'grid grid-cols-[0.3fr_2fr] gap-[1rem] w-full max-s:relative max-md:grid-cols-[0fr_3fr]',
					className
				)}
			>
				<Link href={`${PUBLIC_ROUTES.TITLES}/${id}`}>
					<div
						className={twMerge(
							'relative aspect-8/12 h-[100%] min-w-[3rem] w-ful min-h-[100%] shrink-0 max-md:max-w-[8rem] max-s:absolute max-s:w-full max-s:h-full max-s:min-h-full max-s:max-w-full max-s:aspect-auto'
						)}
					>
						<Image
							sizes='max-width:334px'
							fill
							alt={`${title}`}
							src={coverUrl}
							className='rounded shadow-md object-cover max-s:opacity-10 z-[1]'
							priority
						/>
					</div>
				</Link>

				<div className='flex flex-col gap-[.5rem] max-w-full'>
					<Link href={`${PUBLIC_ROUTES.TITLES}/${id}`}>
						<p className='w-full text-md font-semibold text-white line-clamp-1'>{title}</p>
					</Link>
					<div>
						{sortedChapters?.slice(0, chaptersLength).map(chapter => (
							<ChapterLink
								key={chapter.id}
								chapter={chapter}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
