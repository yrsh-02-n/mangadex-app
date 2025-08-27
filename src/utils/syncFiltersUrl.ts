'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { SearchState, useSearchStore } from '@/store/search.store'

export const SyncFiltersUrl = () => {
	const router = useRouter()
	const pathName = usePathname()
	const searchParams = useSearchParams()
	const isInitializedRef = useRef(false)

	const appliedDemographics = useSearchStore(state => state.appliedDemographics)
	const initializedFilters = useSearchStore(state => state.initializeFilters)

	// parse url parameters
	useEffect(() => {
		if (isInitializedRef.current) {
			return
		}

		const parseFiltersFromURL = () => {
			const demosParam = searchParams.get('demos')
			let demos: string[] = []
			if (demosParam) {
				demos = demosParam.split(',').filter(Boolean)
			}
			return { appliedDemographics: demos }
		}

		const initialFilters = parseFiltersFromURL()
		initializedFilters(initialFilters)
		isInitializedRef.current = true
	}, [searchParams, initializedFilters])

	// query string generation
	useEffect(() => {
		if (!isInitializedRef.current) {
			return
		}

		const createQueryString = () => {
			const params = new URLSearchParams(searchParams.toString())

			if (appliedDemographics.length > 0) {
				params.set('demos', appliedDemographics.join(','))
			} else {
				params.delete('demos')
			}

			//other params

			return params.toString()
		}

		const newQueryString = createQueryString()
		const newUrl = `${pathName}?${newQueryString}`
		const currentUrl = `${pathName}?${searchParams.toString()}`

		if (newUrl !== currentUrl) {
			router.replace(newUrl)
			router.replace(newUrl, { scroll: false })
		}
	}, [pathName, router, searchParams, appliedDemographics])

	return null
}
