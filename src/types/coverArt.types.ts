import { RelationshipType } from './enums'
import { IBaseRelationship } from './relationship.types'

export interface ICoverArtAttributes {
	fileName: string
	description: string
	volume: string | null
	createdAt: string
	updatedAt: string
	version: number
}

export interface ICoverArtRelationship extends IBaseRelationship {
	type: RelationshipType.COVER_ART
	attributes: ICoverArtAttributes
}
