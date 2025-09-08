import { defaultAxios } from '@/api/axios'

import {
	ChaptersListResponse,
	MangaListResponse,
	MangaResponse,
	TagsResponse
} from '@/types/api.types'

class MangaService {
	private _TITLES = '/manga'
	private _TITLE = '/manga'

	getAll(params?: { limit?: number; offset?: number; total?: number }) {
		return defaultAxios.get<MangaListResponse>(this._TITLES, {
			params: {
				...params,
				'includes[]': ['author', 'artist', 'cover_art']
			}
		})
	}

	byId(id?: string | null) {
		return defaultAxios.get<MangaResponse>(`${this._TITLE}/${id}`, {
			params: {
				'contentRating[]': 'safe',
				'includes[]': ['author', 'artist', 'cover_art']
			}
		})
	}

	getChaptersById(id?: string | null) {
		return defaultAxios.get<ChaptersListResponse>(`${this._TITLE}/${id}/feed`)
	}

	getTags() {
		return defaultAxios.get<TagsResponse>(`${this._TITLE}/tag`)
	}

	getBySearchParams(
		searchParams?: {
			title?: string
			publicationDemographic?: string | string[]
			year?: number
			originLang?: string | string[]
			translatedLang?: string | string[]
			includedTags?: string[]
			excludedTags?: string[]
		},
		paginationParams?: { limit?: number; offset?: number; total?: number }
	) {
		return defaultAxios.get<MangaListResponse>(this._TITLES, {
			params: {
				...searchParams,
				...paginationParams,
				'contentRating[]': 'safe',
				'includes[]': ['author', 'artist', 'cover_art']
			}
		})
	}
}

export const mangaService = new MangaService()
