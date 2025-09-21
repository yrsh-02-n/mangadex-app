import { useEffect, useState } from 'react'

import { supabase } from '../lib/supabaseClient'

export function useMangaStatus(mangaId: string, userId: string | null) {
	const [status, setStatus] = useState<string | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (!userId) return

		fetchStatus()
	}, [mangaId, userId])

	const fetchStatus = async () => {
		const { data, error } = await supabase
			.from('user_manga')
			.select('status')
			.eq('user_id', userId)
			.eq('manga_id', mangaId)
			.single()

		if (!error && data) {
			setStatus(data.status)
		}
		setLoading(false)
	}

	const updateStatus = async (newStatus: string) => {
		if (!userId) return

		const { error } = await supabase.from('user_manga').upsert(
			{
				user_id: userId,
				manga_id: mangaId,
				status: newStatus,
				updated_at: new Date().toISOString()
			},
			{
				onConflict: 'user_id,manga_id'
			}
		)

		if (!error) {
			setStatus(newStatus)
		}
	}

	return { status, loading, updateStatus }
}
