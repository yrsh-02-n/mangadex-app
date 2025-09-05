'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { useSearchStore } from '@/store/search.store'

export const SyncFiltersUrl = () => {
	const isInitializedRef = useRef(false)
	const router = useRouter()
	const pathName = usePathname()
	const searchParams = useSearchParams()

	const appliedDemographics = useSearchStore(state => state.appliedDemographics)
	const appliedOriginalLangs = useSearchStore(state => state.appliedOriginalLangs)
	const appliedTranslatedLangs = useSearchStore(state => state.appliedTranslatedLangs)
	const appliedIncludedTags = useSearchStore(state => state.appliedIncludedTags)
	const appliedExcludedTags = useSearchStore(state => state.appliedExcludedTags)
	const appliedStatuses = useSearchStore(state => state.appliedStatus)
	const initializedFilters = useSearchStore(state => state.initializeFilters)

	// parse url parameters
	useEffect(() => {
		if (isInitializedRef.current) {
			return
		}

		const parseFiltersFromURL = () => {
			const demosParam = searchParams.get('demos')
			const originLangParam = searchParams.get('originLang')
			const transLangsParam = searchParams.get('translatedLang')
			const exTagsParam = searchParams.get('excludedTags')
			const inTagsParam = searchParams.get('includedTags')
			const appliedStatuses = searchParams.get('status')

			let demos: string[] = []
			if (demosParam) {
				demos = demosParam.split(',').filter(Boolean)
			}

			let originLang: string[] = []
			if (originLangParam) {
				originLang = originLangParam.split(',').filter(Boolean)
			}

			let transLang: string[] = []
			if (transLangsParam) {
				transLang = transLangsParam.split(',').filter(Boolean)
			}

			let exTag: string[] = []
			if (exTagsParam) {
				exTag = exTagsParam.split(',').filter(Boolean)
			}

			let inTag: string[] = []
			if (inTagsParam) {
				inTag = inTagsParam.split(',').filter(Boolean)
			}

			let StatusValue: string[] = []
			if (appliedStatuses) {
				StatusValue = appliedStatuses.split(',').filter(Boolean)
			}

			return {
				appliedDemographics: demos,
				appliedOriginalLangs: originLang,
				appliedTranslatedLangs: transLang,
				appliedExcludedTags: exTag,
				appliedIncludedTags: inTag,
				appliedStatuses: StatusValue
			}
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

			if (appliedTranslatedLangs.length > 0) {
				params.set('translatedLang', appliedTranslatedLangs.join(','))
			} else {
				params.delete('translatedLang')
			}

			if (appliedExcludedTags.length > 0) {
				params.set('excludedTags', appliedExcludedTags.join(','))
			} else {
				params.delete('excludedTags')
			}

			if (appliedIncludedTags.length > 0) {
				params.set('includedTags', appliedIncludedTags.join(','))
			} else {
				params.delete('includedTags')
			}

			if (appliedStatuses.length > 0) {
				params.set('status', appliedStatuses.join(','))
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
	}, [
		pathName,
		router,
		searchParams,
		appliedDemographics,
		appliedOriginalLangs,
		appliedTranslatedLangs,
		appliedExcludedTags,
		appliedIncludedTags,
		appliedStatuses
	])

	return null
}
