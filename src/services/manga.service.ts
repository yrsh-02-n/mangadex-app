import { defaultAxios } from '@/api/axios'

import { ChaptersListResponse, ChaptersResponse, MangaListResponse, MangaResponse } from '@/types/api.types'

class MangaService {
	private _TITLES = '/manga?contentRating[]=safe'
	private _TITLE = '/manga'
	// private _TITLES = '/manga?availableTranslatedLanguage[]=ru'
	// private _TITLES = '/manga'

	getAll(params?: { limit?: number; offset?: number; total?: number }) {
		return defaultAxios.get<MangaListResponse>(this._TITLES, {
			params: {
				...params,
				// extended params from https://api.mangadex.org/docs/01-concepts/reference-expansion/
				'includes[]': ['author', 'artist', 'cover_art']
			}
		})
	}

	byId(id?: string | null) {
		return defaultAxios.get<MangaResponse>(`${this._TITLE}/${id}`, {
			params: {
				'includes[]': ['author', 'artist', 'cover_art']
			}
		})
	}

	getChaptersById(id?: string | null) {
		return defaultAxios.get<ChaptersListResponse>(`${this._TITLE}/${id}/feed`)
	}
}

export const mangaService = new MangaService()
