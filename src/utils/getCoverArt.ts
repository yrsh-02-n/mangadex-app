import { ICoverArtRelationship } from '@/types/coverArt.types'
import { RelationshipType } from '@/types/enums'
import { IBaseRelationship } from '@/types/relationship.types'

export const getCoverArt = (
	relationships: IBaseRelationship[] | undefined,
	id: string | undefined,
	size?: 'thumbnail' | 'small' | 'medium' | 'large' | 'original'
) => {
	if (!relationships || !id) {
		return '/placeholder-cover.jpg'
	}

	const coverRel = relationships?.find(
		(rel): rel is ICoverArtRelationship => rel.type === RelationshipType.COVER_ART
	)

	if (!coverRel) {
		return '/placeholder-cover.jpg'
	}

	const baseFileName = coverRel.attributes.fileName

	let imageUrl: string

	switch (size) {
		case 'thumbnail':
			imageUrl = `https://uploads.mangadex.org/covers/${id}/${baseFileName}.256.jpg`
			break
		case 'small':
			imageUrl = `https://uploads.mangadex.org/covers/${id}/${baseFileName}.512.jpg`
			break
		case 'original':
		default:
			imageUrl = `https://uploads.mangadex.org/covers/${id}/${baseFileName}.256.jpg`
			break
	}

	// Используем прокси для изображений, если включено
	const useProxy = process.env.NEXT_PUBLIC_USE_IMAGE_PROXY === 'true'

	if (useProxy) {
		return `/api/image-proxy?url=${encodeURIComponent(imageUrl)}`
	}

	return imageUrl
}
