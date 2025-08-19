import { RelationshipType } from "./enums"
import { IBaseRelationship } from "./relationship.types"

export interface IAuthorAttributes {
	name: string
}

export interface IAuthorRelationship extends IBaseRelationship {
	type: RelationshipType.AUTHOR
	attributes: IAuthorAttributes
}

export interface IArtistRelationship extends IBaseRelationship {
	type: RelationshipType.ARTIST
	attributes: IAuthorAttributes
}