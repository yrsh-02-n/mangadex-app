import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url)
	const endpoint = searchParams.get('endpoint')

	if (!endpoint) {
		return new Response('Missing endpoint parameter', { status: 400 })
	}

	try {
		// Формируем правильный URL для MangaDex API
		const mangaDexUrl = `https://api.mangadex.org${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`

		// Копируем остальные параметры в URL
		const otherParams = new URLSearchParams()
		searchParams.forEach((value, key) => {
			if (key !== 'endpoint') {
				otherParams.append(key, value)
			}
		})

		const fullUrl = `${mangaDexUrl}${otherParams.toString() ? '?' + otherParams.toString() : ''}`

		const response = await fetch(fullUrl, {
			headers: {
				'User-Agent': 'MangaDexApp/1.0',
				'Content-Type': 'application/json'
			}
		})

		const data = await response.json()

		return new Response(JSON.stringify(data), {
			headers: {
				'Content-Type': 'application/json'
			}
		})
	} catch (error: any) {
		console.error('Proxy error:', error)
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}
}
