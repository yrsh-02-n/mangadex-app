import Image from 'next/image'
import Link from 'next/link'

import { PUBLIC_ROUTES } from '@/config/public-routes.config'

import { getCoverArt } from '@/utils/getCoverArt'
import { getLocalizedTitle } from '@/utils/getLocalizedTitle'
import { getTags } from '@/utils/getTags'

import { Tag } from '../ui/tag/Tag'

import { ITitle } from '@/types/title.types'

export function GridCard({ attributes, id, relationships }: ITitle) {
	// utils
	const title = getLocalizedTitle(attributes)
	const coverUrl = getCoverArt(relationships, id)
	const tags = getTags(attributes)

	return (
		<div>
			<Link href={`${PUBLIC_ROUTES.TITLES}/${id}`}>
				<div className='flex w-full bg-primary rounded'>
					<Image
						width={200}
						height={250}
						alt={`${title}`}
						src={coverUrl}
						className='rounded-tl-sm rounded-bl-sm shadow-md object-cover'
					/>
					{/* <div className='absolute inset-0 flex items-start'>
						<Tag
							className='ml-[.2rem] mt-[.2rem]'
							tag={tags && tags[0]}
						/>
					</div> */}
					<div className='flex flex-1 p-[2rem]'>
						<p className='w-full text-lg text-white line-clamp-2'>{title}</p>
					</div>
				</div>
			</Link>
		</div>
	)
}
