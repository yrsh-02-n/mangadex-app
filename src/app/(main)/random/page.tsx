'use client'

import Image from 'next/image'
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
		return (
			<div className='flex flex-col items-center justify-center gap-[2rem] min-h-screen'>
				<Image
					height='200'
					width='200'
					alt='loader'
					src={'/loader.gif'}
					unoptimized
				/>
				<p className='text-xl font-semibold'>Загрузка...</p>
			</div>
		)
	}

	return null
}
