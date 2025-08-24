import { Tag } from '@/components/ui/tag/Tag'

import { getArtist, getAuthor } from '@/utils/getAuthors'
import { getTags } from '@/utils/getTags'

import { SlugAttributesItem } from './SlugAttributesItem'
import { MangaRes } from '@/types/api.types'

export function SlugAttributes({ data }: MangaRes) {
	const mangaData = data?.data

	const author = getAuthor(mangaData?.relationships)
	const artist = getArtist(mangaData?.relationships)
	const isAuthorAndArtist = author !== artist

	const tags = mangaData?.attributes && getTags(mangaData.attributes)
	const genreTags = tags?.filter(tag => tag.attributes.group === 'genre') || []
	const themeTags = tags?.filter(tag => tag.attributes.group === 'theme') || []
	const formatTags = tags?.filter(tag => tag.attributes.group === 'format') || []
	const hasGenreTags = genreTags.length > 0
	const hasThemeTags = themeTags.length > 0
	const hasFormatTags = formatTags.length > 0

	const demographic = mangaData?.attributes?.publicationDemographic
	const hasDemographic = demographic !== null

	return (
		<div className='flex flex-col gap-[1.5rem] bg-primary rounded p-[1.5rem]'>
			{!isAuthorAndArtist ? (
				<SlugAttributesItem itemName='Автор и художник'>
					<Tag>{author?.name}</Tag>
				</SlugAttributesItem>
			) : (
				<>
					<SlugAttributesItem itemName='Автор'>
						<Tag>{author?.name}</Tag>
					</SlugAttributesItem>

					<SlugAttributesItem itemName='Художник'>
						<Tag>{artist?.name}</Tag>
					</SlugAttributesItem>
				</>
			)}

			{hasGenreTags ? (
				<SlugAttributesItem itemName='Жанры'>
					{genreTags.map((tag, index) => (
						<Tag
							key={tag.id || index}
							tag={tag}
							href={tag.id}
						/>
					))}
				</SlugAttributesItem>
			) : null}

			{hasThemeTags ? (
				<SlugAttributesItem itemName='Тематика'>
					{themeTags.map((tag, index) => (
						<Tag
							key={tag.id || index}
							tag={tag}
							href={tag.id}
						/>
					))}
				</SlugAttributesItem>
			) : null}

			{hasDemographic ? (
				<SlugAttributesItem itemName='Возрастная категория'>
					<Tag>{demographic}</Tag>
				</SlugAttributesItem>
			) : null}

			{hasFormatTags ? (
				<SlugAttributesItem itemName='Формат'>
					{formatTags.map((tag, index) => (
						<Tag
							key={tag.id || index}
							tag={tag}
							href={tag.id}
						/>
					))}
				</SlugAttributesItem>
			) : null}
		</div>
	)
}
