import Image from 'next/image'
import Link from 'next/link'

import { PUBLIC_ROUTES } from '@/config/public-routes.config'

import { getArtist, getAuthor } from '@/utils/getAuthors'
import { getCoverArt } from '@/utils/getCoverArt'
import { getDesription } from '@/utils/getDesription'
import { getLimitedTags } from '@/utils/getLimitedTags'
import { getLocalizedTitle } from '@/utils/getLocalizedTitle'
import { getTags } from '@/utils/getTags'

import { TitleStatus } from '../ui/status/TitleStatus'
import { Tag } from '../ui/tag/Tag'

import { ITitle } from '@/types/title.types'

export function FullWidthSliderCard({ attributes, id, relationships }: ITitle) {
	// utils
	const title = getLocalizedTitle(attributes)
	const coverUrl = getCoverArt(relationships, id, 'small')
	const tags = getTags(attributes)
	const limitedTags = getLimitedTags({ tags: tags || [] })
	const description = getDesription(attributes)

	const author = getAuthor(relationships)
	const artist = getArtist(relationships)
	const isAuthorAndArtist = author?.name === artist?.name
	const year = attributes?.year

	return (
		<div className='w-full max-w-full max-sm:mt-[.5rem]'>
			<Link href={`${PUBLIC_ROUTES.TITLES}/${id}`}>
				<div className='flex w-full rounded max-s:relative'>
					<div
						className='relative w-[12rem] h-[auto] min-h-[18rem] min-w-[12rem] max-h-[18rem]
        max-s:absolute max-s:w-full max-s:h-full max-s:min-h-full max-s:max-w-full max-sm:hidden'
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

					<div className='flex flex-col gap-[1rem] pl-[1.5rem] flex-1 max-w-full max-sm:pl-0'>
						<div className='flex items-top justify-between gap-[1rem] max-lg:flex-col-reverse'>
							<p className='w-full text-3xl font-semibold text-white line-clamp-1 max-s:text-2xl'>
								{title}
							</p>

							<TitleStatus attributes={attributes} />
						</div>
						<div className='flex items-start gap-[0.5rem] flex-wrap'>
							{limitedTags?.map((tag, index) => (
								<Tag
									key={index}
									tag={tag}
									href={tag.id}
								/>
							))}
						</div>
						<div>
							<p className='line-clamp-3 text-balance max-s:line-clamp-3 max-w-[95%]'>
								{description}
							</p>
						</div>
						<div className='pb-[2rem]'>
							{isAuthorAndArtist ? (
								<p>Автор и художник: {author?.name}</p>
							) : (
								<>
									<p>Автор: {author?.name}</p>
									<p>Художник: {artist?.name}</p>
								</>
							)}
							<p>{'Год выхода: ' + year}</p>
						</div>
					</div>
				</div>
			</Link>
		</div>
	)
}
