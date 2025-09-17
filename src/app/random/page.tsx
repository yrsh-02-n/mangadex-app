'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useRandomManga } from '@/hooks/useRandomManga'

export default function RandomPage() {
	const router = useRouter()
	const { data, isLoading, isError } = useRandomManga()

	useEffect(() => {
		if (isLoading) return

		if (isError || !data) {
			router.push('/titles')
			return
		}

		const allTitles = data.data

		if (allTitles.length === 0) {
			router.push('/titles')
			return
		}

		// pick random
		const randomIndex = Math.floor(Math.random() * allTitles.length)
		const randomManga = allTitles[randomIndex]

		// redirect
		router.push(`/titles/${randomManga.id}`)
	}, [data, isLoading, isError, router])

	if (isLoading) {
		return <div className='flex items-center justify-center min-h-screen'>Загрузка...</div>
	}

	return null
}
