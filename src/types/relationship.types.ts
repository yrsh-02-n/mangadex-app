import { RelationshipType } from './enums'

export interface IBaseRelationship {
	id: string
	type: RelationshipType | 'tag'
	related?: string
}
