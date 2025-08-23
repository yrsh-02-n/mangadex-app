export interface IChapterAttributes {
	volume: string | null
	chapter: string | null
	title: string | null
	translatedLanguage: string | null
	externalUrl: string | null
	isUnavailable: boolean
	publishAt: string | null
	readableAt: string | null
	createdAt: string | null
	updatedAt: string | null
	pages: number | null
	version: number | null
}

export interface IChapterRelationships {
	id: string | null
	type: string | null
}

export interface IChapter {
	id: string | null
	type: string | null
	attributes: IChapterAttributes
	relationships: IChapterRelationships[]
}
