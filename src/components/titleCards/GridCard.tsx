import Image from 'next/image';
import Link from 'next/link';



import { PUBLIC_ROUTES } from '@/config/public-routes.config';



import { getCoverArt } from '@/utils/getCoverArt';
import { getDesription } from '@/utils/getDesription';
import { getLocalizedTitle } from '@/utils/getLocalizedTitle';
import { getTags } from '@/utils/getTags';



import { TitleStatus } from '../ui/status/TitleStatus';
import { Tag } from '../ui/tag/Tag';



import { ITitle } from '@/types/title.types';





export function GridCard({ attributes, id, relationships }: ITitle) {
	// utils
	const title = getLocalizedTitle(attributes)
	const coverUrl = getCoverArt(relationships, id, 'thumbnail')
	const tags = getTags(attributes)
	const description = getDesription(attributes)

	return (
		<div>
			<div className='flex w-full bg-primary rounded max-s:relative'>
				<Link href={`${PUBLIC_ROUTES.TITLES}/${id}`}>
					<div
						className='relative w-[12rem] h-[auto] min-h-[18rem] max-md:max-w-[8rem]
        max-s:absolute max-s:w-full max-s:h-full max-s:min-h-full max-s:max-w-full'
					>
						<Image
							sizes='max-width:334px'
							fill
							alt={`${title}`}
							src={coverUrl}
							className='rounded-tl-sm rounded-bl-sm shadow-md object-cover max-s:opacity-10 z-[1]'
							priority
						/>
					</div>
				</Link>

				<div className='flex flex-col gap-[1rem] p-[1.5rem] flex-1 max-w-full'>
					<div className='flex items-top justify-between gap-[1rem] max-lg:flex-col-reverse'>
						<Link href={`${PUBLIC_ROUTES.TITLES}/${id}`}>
							<p className='w-full text-xl font-semibold text-white line-clamp-2'>{title}</p>
						</Link>
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
						<p className='line-clamp-5 text-balance max-s:line-clamp-6'>{description}</p>
					</div>
				</div>
			</div>
		</div>
	)
}