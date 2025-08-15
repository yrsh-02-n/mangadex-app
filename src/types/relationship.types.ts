import { RelationshipType } from './enums'

export interface IBaseRelationship {
	id: string
	type: RelationshipType | 'tag'
	related?: string
}

export interface IAuthorRelationship extends IBaseRelationship {
	type: RelationshipType.AUTHOR
}

export interface IArtistRelationship extends IBaseRelationship {
	type: RelationshipType.ARTIST
}
