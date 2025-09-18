'use client'

import dynamic from 'next/dynamic'

const DynPopularRuBlock = dynamic(
	() => import('./PopularRuBlock').then(mod => mod.PopularRuBlock),
	{
		ssr: false
	}
)

export function DynamicPopularRuBlock() {
	return <DynPopularRuBlock />
}
