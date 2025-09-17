import Image from 'next/image'
import Link from 'next/link'

import { PUBLIC_ROUTES } from '@/config/public-routes.config'

import { useChaptersById } from '@/hooks/useChaptersById'

import { getCoverArt } from '@/utils/getCoverArt'
import { getLocalizedTitle } from '@/utils/getLocalizedTitle'

import ChapterLink from '@/app/titles/[slug]/SlugInfo/SlugChapters/chaptersAccordion/ChapterLink'
import { ITitle } from '@/types/title.types'

export function ChaptersCard({ attributes, id, relationships }: ITitle) {
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
			<div className='flex gap-[1rem] w-full max-s:relative'>
				<Link href={`${PUBLIC_ROUTES.TITLES}/${id}`}>
					<div
						className='relative w-[4rem] h-[auto] min-h-[6rem] max-md:max-w-[8rem]
        max-s:absolute max-s:w-full max-s:h-full max-s:min-h-full max-s:max-w-full'
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

				<div className='flex flex-col gap-[.5rem] flex-1 max-w-full'>
					<Link href={`${PUBLIC_ROUTES.TITLES}/${id}`}>
						<p className='w-full text-md font-semibold text-white line-clamp-1'>{title}</p>
					</Link>
					<div>
						{sortedChapters?.slice(0, 2).map(chapter => (
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
