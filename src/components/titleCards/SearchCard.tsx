import Image from 'next/image'
import Link from 'next/link'

import { PUBLIC_ROUTES } from '@/config/public-routes.config'

import { useSearchModalState } from '@/store/ui.store'

import { getCoverArt } from '@/utils/getCoverArt'
import { getDesription } from '@/utils/getDesription'
import { getLocalizedTitle } from '@/utils/getLocalizedTitle'
import { getTags } from '@/utils/getTags'

import { TitleStatus } from '../ui/status/TitleStatus'
import { Tag } from '../ui/tag/Tag'

import { ITitle } from '@/types/title.types'

export function SearchCard({ attributes, id, relationships }: ITitle) {
	// utils
	const title = getLocalizedTitle(attributes)
	const coverUrl = getCoverArt(relationships, id)
	const tags = getTags(attributes)
	const description = getDesription(attributes)
	const { closeSearchModal } = useSearchModalState()

	return (
		<div className='mb-[1rem] last:mb-0'>
			<Link
				href={`${PUBLIC_ROUTES.TITLES}/${id}`}
				onClick={closeSearchModal}
			>
				<div className='flex w-full bg-white/5 hover:bg-white/10 gap-[.5rem] rounded max-s:relative transition-colors duration-200'>
					<div
						className='relative w-[7rem] h-[auto] min-h-[10rem] max-md:max-w-[8rem]
        max-s:absolute max-s:w-full max-s:h-full max-s:min-h-full max-s:max-w-full'
					>
						<Image
							sizes='max-width:334px'
							fill
							alt={`${title}`}
							src={coverUrl}
							className='rounded-tl-sm rounded-bl-sm shadow-md object-cover max-s:opacity-10 z-[1]'
							priority
							unoptimized
						/>
					</div>

					<div className='flex flex-col gap-[1rem] p-[.5rem] flex-1 max-w-full'>
						<div className='flex items-top justify-between gap-[1rem] max-lg:flex-col-reverse'>
							<p className='w-full text-xl font-semibold text-white line-clamp-2'>{title}</p>

							<TitleStatus attributes={attributes} />
						</div>
						<div className='flex items-start gap-[0.5rem] flex-wrap'>
							{tags?.slice(0, 4).map((tag, index) => (
								<Tag
									key={index}
									tag={tag}
									href={tag.id}
								/>
							))}
						</div>
						<div>
							<p className='line-clamp-2 text-balance text-white max-lg:hidden break-all'>{description}</p>
						</div>
					</div>
				</div>
			</Link>
		</div>
	)
}
