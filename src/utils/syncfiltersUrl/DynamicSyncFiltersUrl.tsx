'use client'

import dynamic from 'next/dynamic'

const DynSyncFiltersUrl = dynamic(
	() => import('./syncFiltersUrl').then(mod => mod.SyncFiltersUrl),
	{ ssr: false }
)

export function DynamicSyncFiltersUrl() {
	return <DynSyncFiltersUrl />
}
