import { ICoverArtRelationship } from '@/types/coverArt.types'
import { RelationshipType } from '@/types/enums'
import { IBaseRelationship } from '@/types/relationship.types'

export const getCoverArt = (
	relationships: IBaseRelationship[] | undefined,
	id: string | undefined,
	size?: 'thumbnail' | 'small' | 'medium' | 'large' | 'original'
) => {
	if (!relationships || !id) {
		return '/placeholder-cover.png'
	}

	const coverRel = relationships?.find(
		(rel): rel is ICoverArtRelationship => rel.type === RelationshipType.COVER_ART
	)

	if (!coverRel) {
		return '/placeholder-cover.jpg'
	}

	const baseFileName = coverRel.attributes.fileName

	switch (size) {
		case 'thumbnail':
			return `https://uploads.mangadex.org/covers/${id}/${baseFileName}.256.jpg`
		case 'small':
			return `https://uploads.mangadex.org/covers/${id}/${baseFileName}.512.jpg`
		case 'original':
		default:
			return `https://uploads.mangadex.org/covers/${id}/${baseFileName}`
	}
}
