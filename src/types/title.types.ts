import {
	ContentRating,
	PublicationDemographic,
	ReadingStatus,
	RelationshipType,
	Status
} from './enums'
import { IBaseRelationship } from './relationship.types'

// for alternative language title
export interface IAltTitle {
	[language: string]: string
}

// for alternative language description
export interface ILocalizedString {
	[language: string]: string
}

export interface IMangaAttributes {
	title?: ILocalizedString
	altTitles?: IAltTitle[]
	description?: ILocalizedString
	publicationDemographic?: PublicationDemographic
	status?: Status
	contentRating?: ContentRating
	year?: number
	tags?: ITag[]
	createdAt?: string
	updatedAt?: string
	availableTranslatedLanguages?: string[]
	latestUploadedChapter?: string
}

export interface ITagAttributes {
	name: 'en' | string // may be ILocalized string
	description?: string // may be ILocalized string
	group?: string
	version?: number
}

export interface ITag {
	id?: string
	type?: 'tag'
	attributes: ITagAttributes
	relationships?: IBaseRelationship[]
}

export interface ITitle {
	id?: string
	type?: string
	attributes: IMangaAttributes
	relationships?: IBaseRelationship[]
}
