import { ICoverArtRelationship } from '@/types/coverArt.types'
import { RelationshipType } from '@/types/enums'
import { IBaseRelationship } from '@/types/relationship.types'

export const getCoverArt = (relationships: IBaseRelationship[] | undefined, id: string | undefined) => {
	if (!relationships) {
		return '/placeholder-cover.png'
	}
	const coverRel = relationships?.find(
		(rel): rel is ICoverArtRelationship => rel.type === RelationshipType.COVER_ART
	)

	const coverUrl = coverRel
		? `https://uploads.mangadex.org/covers/${id}/${coverRel.attributes.fileName}.256.jpg`
		: '/placeholder-cover.png' // dont forget to add a placeholder

	return coverUrl
}
