'use client'

import dynamic from 'next/dynamic'

const DynLatestUpdatesBlock = dynamic(
	() => import('./LatestUpdatesBlock').then(mod => mod.LatestUpdatesBlock),
	{ ssr: false }
)

export function DynamicLatestUpdatesBlock() {
	return <DynLatestUpdatesBlock />
}
