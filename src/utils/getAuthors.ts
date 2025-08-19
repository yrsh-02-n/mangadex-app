import { IArtistRelationship, IAuthorRelationship } from '@/types/authors.types'
import { RelationshipType } from '@/types/enums'
import { IBaseRelationship } from '@/types/relationship.types'

export const getAuthor = (relationships: IBaseRelationship[] | undefined) => {
	const authorRel = relationships?.find(
		(rel): rel is IAuthorRelationship => rel.type === RelationshipType.AUTHOR
	)
	const author = authorRel?.attributes
	return author
}

export const getArtist = (relationships: IBaseRelationship[] | undefined) => {
	const artistRel = relationships?.find(
		(rel): rel is IArtistRelationship => rel.type === RelationshipType.ARTIST
	)
	const artist = artistRel?.attributes
	return artist
}
