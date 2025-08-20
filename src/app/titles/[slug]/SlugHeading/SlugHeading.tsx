import Image from 'next/image'

import { Button } from '@/components/ui/button/Button'
import { Heading } from '@/components/ui/heading/Heading'
import { SkeletonLoader } from '@/components/ui/skeletonLoader/SkeletonLoader'
import { TitleStatus } from '@/components/ui/status/TitleStatus'
import { Tag } from '@/components/ui/tag/Tag'

import { getCoverArt } from '@/utils/getCoverArt'
import { getDesription } from '@/utils/getDesription'
import { getLocalizedTitle } from '@/utils/getLocalizedTitle'
import { getTags } from '@/utils/getTags'

import { AuthorArtist } from './AuthorArtist'
import { MangaResponse } from '@/types/api.types'

interface Props {
	data: MangaResponse | undefined
}

export function SlugHeading({ data }: Props) {
	const mangaData = data?.data
	const title = mangaData?.attributes ? getLocalizedTitle(mangaData.attributes) : ''
	// title on original lang
	const firstTitleObject = mangaData?.attributes?.altTitles?.[0]
	const firstAvailableTitle = firstTitleObject ? Object.values(firstTitleObject)[0] : undefined
	//
	const description = mangaData?.attributes ? getDesription(mangaData.attributes) : ''
	const coverUrl = getCoverArt(mangaData?.relationships, mangaData?.id)
	const tags = mangaData?.attributes && getTags(mangaData.attributes)
	const year = mangaData?.attributes.year

  

	return (
		<section className='w-full'>
			{mangaData ? (
				<div className='flex gap-[2rem] max-[810px]:flex-col'>
					<div className='relative w-[19rem] h-[auto] min-w-[18rem] min-h-[19rem] max-[810px]:w-full max-[810px]:max-w-full'>
						<Image
							fill
							alt={`${title}`}
							src={coverUrl}
							className='rounded-sm shadow-md object-cover max-[810px]:object-top'
						/>
					</div>

					<div className='bg-primary rounded w-full p-[1.5rem]'>
						<div>
							<div className='flex items-start justify-between'>
								<div>
									<Heading
										isH1
										className='mb-[0.5rem]'
									>
										{title}
									</Heading>

									<Heading
										isH1={false}
										className='text-white/50'
									>
										{firstAvailableTitle}
									</Heading>
								</div>

								<div>
									{mangaData?.attributes && <TitleStatus attributes={mangaData.attributes} />}
								</div>
							</div>

							<p className='mb-[2rem]'>{description}</p>

							<div className='flex gap-x-[1rem] gap-y-[1.5rem] flex-wrap mb-[2rem]'>
								{tags?.map((tag, index) => (
									<Tag
										key={index}
										tag={tag}
										href={tag.id}
										className='p-[.5rem]'
									/>
								))}
							</div>
							<div className='pb-[2rem]'>
								<AuthorArtist data={data} />
                <p>{'Год выхода: ' + year}</p>
							</div>
							<Button
								variable='primary'
								className='px-[1rem]'
							>
								Добавить в библиотеку
							</Button>
						</div>
					</div>
				</div>
			) : (
				<div className='flex gap-[2rem] max-[810px]:flex-col'>
					<SkeletonLoader
						count={1}
						className='w-[19rem] h-[auto] min-w-[18rem] min-h-[19rem] max-[810px]:w-full max-[810px]:max-w-full'
					/>
					<SkeletonLoader
						count={1}
						className='w-full h-full min-h-[19rem]'
					/>
				</div>
			)}
		</section>
	)
}
