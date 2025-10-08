import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url)
	const imageUrl = searchParams.get('url')

	if (!imageUrl) {
		return new NextResponse('Missing url parameter', { status: 400 })
	}

	// Проверяем, что URL от MangaDex
	if (!imageUrl.startsWith('https://uploads.mangadex.org/')) {
		return new NextResponse('Invalid image URL', { status: 400 })
	}

	try {
		const response = await fetch(imageUrl, {
			headers: {
				'User-Agent': 'MangaNexus/1.0',
				Referer: 'https://mangadex.org/'
			}
		})

		if (!response.ok) {
			console.error('Failed to fetch image:', response.status, imageUrl)
			return new NextResponse('Failed to fetch image', { status: response.status })
		}

		const imageBuffer = await response.arrayBuffer()

		// Определяем тип контента из оригинального ответа
		const contentType = response.headers.get('content-type') || 'image/jpeg'

		return new NextResponse(imageBuffer, {
			headers: {
				'Content-Type': contentType,
				'Cache-Control': 'public, max-age=31536000, immutable'
			}
		})
	} catch (error: any) {
		console.error('Image proxy error:', error)
		return new NextResponse('Internal server error', { status: 500 })
	}
}