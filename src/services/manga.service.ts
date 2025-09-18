import axios from 'axios'

import {
	ChaptersListResponse,
	MangaListResponse,
	MangaResponse,
	TagsResponse
} from '@/types/api.types'

class MangaService {
	private proxyAxios = axios.create({
		baseURL: ''
	})

	getTags() {
		return this.proxyAxios
			.get<TagsResponse>('/api/mangadex-proxy', {
				params: {
					endpoint: '/manga/tag'
				}
			})
			.then(response => {
				// exclude some tags
				const restrictedTagNames = [
					'Incest',
					"Boys' Love",
					"Girls' Love",
					'Genderswap',
					'Loli',
					'Shota',
					'Crossdressing'
				]

				const filteredData = {
					...response.data,
					data: response.data.data.filter(tag => {
						const tagName = tag.attributes.name.en
						return !restrictedTagNames.includes(tagName)
					})
				}

				return { data: filteredData }
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
				endpoint: `/manga/${id}/feed`,
				'order[updatedAt]': 'desc',
				'order[chapter]': 'desc',
				'order[volume]': 'desc',
				includeUnavailable: 0,
				'includes[]': 'scanlation_group'
			}
		})
	}

	getRecentlyAdded(params?: { limit?: number; offset?: number; total?: number }) {
		return this.proxyAxios.get<MangaListResponse>('/api/mangadex-proxy', {
			params: {
				endpoint: '/manga',
				...params,
				'order[createdAt]': 'desc',
				'contentRating[]': 'safe',
				'includes[]': ['author', 'artist', 'cover_art']
			}
		})
	}

	getLatestUpdated(params?: { limit?: number; offset?: number; total?: number }) {
		return this.proxyAxios.get<MangaListResponse>('/api/mangadex-proxy', {
			params: {
				endpoint: '/manga',
				...params,
				'order[latestUploadedChapter]': 'desc',
				'contentRating[]': 'safe',
				'includes[]': ['author', 'artist', 'cover_art']
			}
		})
	}

	getMostPopularRu(params?: { limit?: number; offset?: number; total?: number }) {
		return this.proxyAxios.get<MangaListResponse>('/api/mangadex-proxy', {
			params: {
				endpoint: '/manga',
				...params,
				'availableTranslatedLanguage[]': 'ru',
				'order[rating]': 'desc',
				'contentRating[]': 'safe',
				'includes[]': ['author', 'artist', 'cover_art']
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
