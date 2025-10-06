'use client'

import { createClient } from '../client'

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

	const { error } = await supabase.from('user_library').insert({
		id: user.id,
		manga_id: mangaId,
		section: section
	})

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
		.eq('id', user.id)

	if (error) {
		console.error('Ошибка при получении библиотеки:', error)
		throw error
	}

	// group by sections
	const groupedLibrary = data.reduce(
		(acc, item) => {
			const section = item.section as
				| ReadingStatus.READING
				| ReadingStatus.PLANNED
				| ReadingStatus.COMPLETED
				| ReadingStatus.PAUSED
				| ReadingStatus.DROPPED
			if (!acc[section]) {
				acc[section] = []
			}
			acc[section].push(item.manga_id)
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
