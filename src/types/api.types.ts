import { ITitle } from './title.types'

export type SortOrder = 'asc' | 'desc'

export interface MangaListOrder {
	title?: SortOrder
	year?: SortOrder
	createdAt?: SortOrder
	updatedAt?: SortOrder
	latestUploadedChapter?: SortOrder
	followedCount?: SortOrder
	relevance?: SortOrder
}

export interface ChapterListOrder {
	createdAt?: SortOrder
	updatedAt?: SortOrder
	publishAt?: SortOrder
	readableAt?: SortOrder
	volume?: SortOrder
	chapter?: SortOrder
}

export interface MangaResponse {
	result: string
	response: string
	data: ITitle
}

export interface MangaListResponse {
	result: 'ok' | 'error'
	response: 'collection'
	data: ITitle[]
	limit: number
	offset: number
	total: number
}
