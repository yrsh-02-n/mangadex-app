import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'uploads.mangadex.org'
			},
			{
				protocol: 'https',
				hostname: 'keqfumjwzqtqdlwfwpao.supabase.co'
			}
		],
		domains: ['uploads.mangadex.org', 'keqfumjwzqtqdlwfwpao.supabase.co']
	}
}

export default nextConfig
