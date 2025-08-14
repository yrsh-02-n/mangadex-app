import { defaultAxios } from '@/api/axios'

import { MangaListResponse } from '@/types/api.types'

class MangaService {
	private _TITLES = '/manga'

	getAll(params?: { limit?: number; offset?: number, total?:number }) {
		return defaultAxios.get<MangaListResponse>(this._TITLES, { params })
	}
}

export const mangaService = new MangaService()
