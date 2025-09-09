import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'uploads.mangadex.org',
				port: '',
				pathname: '/covers/**'
			}
		]
	}
}

export default nextConfig
