'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { useSearchStore } from '@/store/search.store'

export const SyncFiltersUrl = () => {
	const router = useRouter()
	const pathName = usePathname()
	const searchParams = useSearchParams()
	const isInitializedRef = useRef(false)

	const appliedDemographics = useSearchStore(state => state.appliedDemographics)
	const appliedOriginalLangs = useSearchStore(state => state.appliedOriginalLangs)
	const initializedFilters = useSearchStore(state => state.initializeFilters)

	// parse url parameters
	useEffect(() => {
		if (isInitializedRef.current) {
			return
		}

		const parseFiltersFromURL = () => {
			const demosParam = searchParams.get('demos')
			const originLangParam = searchParams.get('originLang')

			let demos: string[] = []
			if (demosParam) {
				demos = demosParam.split(',').filter(Boolean)
			}

			let originLang: string[] = []
			if (originLangParam) {
				originLang = originLangParam.split(',').filter(Boolean)
			}
			return { appliedDemographics: demos, appliedOriginalLangs: originLang }
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

			if (appliedOriginalLangs.length > 0) {
				params.set('originLang', appliedOriginalLangs.join(','))
			} else {
				params.delete('originLang')
			}

			return params.toString()
		}

		const newQueryString = createQueryString()
		const newUrl = `${pathName}?${newQueryString}`
		const currentUrl = `${pathName}?${searchParams.toString()}`

		if (newUrl !== currentUrl) {
			router.replace(newUrl)
			router.replace(newUrl, { scroll: false })
		}
	}, [pathName, router, searchParams, appliedDemographics, appliedOriginalLangs])

	return null
}
