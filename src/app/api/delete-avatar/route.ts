import { NextRequest } from 'next/server'

import { createClient } from '@/utils/supabase/server'

export async function POST(request: NextRequest) {
	try {
		const { fileName } = await request.json()

		if (!fileName) {
			return Response.json({ error: 'File name is required' }, { status: 400 })
		}

		const supabase = await createClient()

		const { error } = await supabase.storage.from('avatars').remove([fileName])

		if (error) {
			console.error('Ошибка при удалении аватарки:', error)
			return Response.json({ error: error.message }, { status: 500 })
		}

		return Response.json({ message: 'Файл успешно удалён' })
	} catch (error: any) {
		console.error('Ошибка в API маршруте:', error)
		return Response.json({ error: error.message }, { status: 500 })
	}
}
