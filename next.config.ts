import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'uploads.mangadex.org',
				port: '',
				pathname: '/covers/**'
			},
			{
				protocol: 'https',
				hostname: 'keqfumjwzqtqdlwfwpao.supabase.co',
				port: '',
				pathname: '/**'
			}
		]
	}
}

export default nextConfig
