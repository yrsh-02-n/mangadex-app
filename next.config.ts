import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'uploads.mangadex.org',
				port: '', // Оставь пустым для стандартного порта (443 для https)
				pathname: '/covers/**' // Путь к обложкам
			}
		]
	}
}

export default nextConfig
