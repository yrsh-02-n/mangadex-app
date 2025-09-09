// import { defaultAxios } from '@/api/axios'
// import {
// 	ChaptersListResponse,
// 	MangaListResponse,
// 	MangaResponse,
// 	TagsResponse
// } from '@/types/api.types'
// class MangaService {
// 	private _TITLES = '/manga'
// 	private _TITLE = '/manga'
// 	getAll(params?: { limit?: number; offset?: number; total?: number }) {
// 		return defaultAxios.get<MangaListResponse>(this._TITLES, {
// 			params: {
// 				...params,
// 				'includes[]': ['author', 'artist', 'cover_art']
// 			}
// 		})
// 	}
// 	byId(id?: string | null) {
// 		return defaultAxios.get<MangaResponse>(`${this._TITLE}/${id}`, {
// 			params: {
// 				'contentRating[]': 'safe',
// 				'includes[]': ['author', 'artist', 'cover_art']
// 			}
// 		})
// 	}
// 	getChaptersById(id?: string | null) {
// 		return defaultAxios.get<ChaptersListResponse>(`${this._TITLE}/${id}/feed`)
// 	}
// 	getTags() {
// 		return defaultAxios.get<TagsResponse>(`${this._TITLE}/tag`)
// 	}
// 	getBySearchParams(
// 		searchParams?: {
// 			title?: string
// 			publicationDemographic?: string | string[]
// 			year?: number
// 			originLang?: string | string[]
// 			translatedLang?: string | string[]
// 			includedTags?: string[]
// 			excludedTags?: string[]
// 		},
// 		paginationParams?: { limit?: number; offset?: number; total?: number }
// 	) {
// 		return defaultAxios.get<MangaListResponse>(this._TITLES, {
// 			params: {
// 				...searchParams,
// 				...paginationParams,
// 				'contentRating[]': 'safe',
// 				'includes[]': ['author', 'artist', 'cover_art']
// 			}
// 		})
// 	}
// }
// export const mangaService = new MangaService()
import axios from 'axios'

import {
	ChaptersListResponse,
	MangaListResponse,
	MangaResponse,
	TagsResponse
} from '@/types/api.types'

class MangaService {
	private proxyAxios = axios.create({
		baseURL: '' // Пустой baseURL
	})

	getTags() {
		return this.proxyAxios.get<TagsResponse>('/api/mangadex-proxy', {
			params: {
				endpoint: '/manga/tag'
			}
		})
	}

	getAll(params?: { limit?: number; offset?: number; total?: number }) {
		return this.proxyAxios.get<MangaListResponse>('/api/mangadex-proxy', {
			params: {
				endpoint: '/manga',
				...params,
				'contentRating[]': 'safe',
				'includes[]': ['author', 'artist', 'cover_art']
			}
		})
	}

	byId(id?: string | null) {
		if (!id) {
			return Promise.reject(new Error('ID is required'))
		}

		return this.proxyAxios.get<MangaResponse>('/api/mangadex-proxy', {
			params: {
				endpoint: `/manga/${id}`,
				'contentRating[]': 'safe',
				'includes[]': ['author', 'artist', 'cover_art']
			}
		})
	}

	getChaptersById(id?: string | null) {
		if (!id) {
			return Promise.reject(new Error('ID is required'))
		}

		return this.proxyAxios.get<ChaptersListResponse>('/api/mangadex-proxy', {
			params: {
				endpoint: `/manga/${id}/feed`
			}
		})
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
			status?: string | string[]
		},
		paginationParams?: { limit?: number; offset?: number; total?: number }
	) {
		return this.proxyAxios.get<MangaListResponse>('/api/mangadex-proxy', {
			params: {
				endpoint: '/manga',
				...searchParams,
				...paginationParams,
				'contentRating[]': 'safe',
				'includes[]': ['author', 'artist', 'cover_art']
			}
		})
	}
}

export const mangaService = new MangaService()