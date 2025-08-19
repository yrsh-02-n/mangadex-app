import { defaultAxios } from '@/api/axios'

import { MangaListResponse } from '@/types/api.types'

class MangaService {
	private _TITLES = '/manga?contentRating[]=safe'
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
}

export const mangaService = new MangaService()
