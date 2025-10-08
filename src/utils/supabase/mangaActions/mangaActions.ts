'use client'

import { createClient } from '../client'

import { mangaService } from '@/services/manga.service'
import { ReadingStatus } from '@/types/enums'
import { ITitle } from '@/types/title.types'
import { IUserLibrary } from '@/types/user-types/library.types'

const supabase = createClient()

export async function addMangaToLibrary({ section, mangaId }: IUserLibrary) {
	const {
		data: { user },
		error: authError
	} = await supabase.auth.getUser()

	if (authError || !user) {
		throw new Error('Пользователь не авторизован')
	}

	console.log('Добавляем в библиотеку:', { user_id: user.id, manga_id: mangaId, section })

	const { error } = await supabase.from('user_library').upsert(
		{
			user_id: user.id,
			manga_id: mangaId,
			section: section
		},
		{ onConflict: 'user_id, manga_id' }
	)

	if (error) {
		console.error('Ошибка при добавлении манги в библиотеку:', error)
		throw error
	}
}


export async function getUserLibrary() {
	const {
		data: { user },
		error: authError
	} = await supabase.auth.getUser()

	if (authError || !user) {
		throw new Error('Пользователь не авторизован')
	}

	const { data, error } = await supabase
		.from('user_library')
		.select('manga_id, section')
		.eq('user_id', user.id)

	if (error) {
		console.error('Ошибка при получении библиотеки:', error)
		throw error
	}


	const mangaIds = data.map(item => item.manga_id)
	const mangaPromises = mangaIds.map(id => mangaService.byId(id).then(res => res.data))
	const mangaResponses = await Promise.all(mangaPromises)


	const mangaMap = mangaResponses.reduce(
		(acc, res) => {
			const manga = res.data
			if (manga?.id) {
				acc[manga.id] = manga
			}
			return acc
		},
		{} as Record<string, any>
	)

	// Группируем по статусам
	const groupedLibrary = data.reduce(
		(acc, item) => {
			const manga = mangaMap[item.manga_id]
			if (!manga) return acc // пропускаем, если манга не найдена

			const section = item.section as
				| ReadingStatus.READING
				| ReadingStatus.PLANNED
				| ReadingStatus.COMPLETED
				| ReadingStatus.PAUSED
				| ReadingStatus.DROPPED

			if (!acc[section]) {
				acc[section] = []
			}

			acc[section].push({
				id: manga.id,
				attributes: manga.attributes,
        relationships: manga.relationships 
			})

			return acc
		},
		{} as Record<
			| ReadingStatus.READING
			| ReadingStatus.PLANNED
			| ReadingStatus.COMPLETED
			| ReadingStatus.PAUSED
			| ReadingStatus.DROPPED,
			ITitle[]
		>
	)

	return groupedLibrary
}

// get manga reading status for current user
export async function getUserLibraryEntry(mangaId: string) {
	const {
		data: { user },
		error: authError
	} = await supabase.auth.getUser()

	if (authError || !user) {
		throw new Error('Пользователь не авторизован')
	}

	const { data, error } = await supabase
		.from('user_library')
		.select('section')
		.eq('user_id', user.id)
		.eq('manga_id', mangaId)
		.single()

	if (error) {
		if (error.code === 'PGRST116') {
			return null
		}
		console.error('Ошибка при получении статуса манги:', error)
		throw error
	}

	return data.section
}
