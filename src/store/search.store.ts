import { create } from 'zustand'

export interface SearchState {
	selectedDemographics: string[]
	appliedDemographics: string[]

	selectedOriginalLangs: string[]
	appliedOriginalLangs: string[]
	selectedTranslatedLangs: string[]
	appliedTranslatedLangs: string[]

	selectedIncludedTags: string[]
	appliedIncludedTags: string[]
	selectedExcludedTags: string[]
	appliedExcludedTags: string[]
}

interface SearchActions {
	setSelectedDemographics: (demos: string[]) => void

	setSelectedOriginalLangs: (originLang: string[]) => void
	setSelectedTranslatedLangs: (translatedLang: string[]) => void

	setSelectedIncludedTags: (includedTags: string[]) => void
	setSelectedExcludedTags: (excludedTags: string[]) => void

	applyFilters: () => void
	resetSelectedFilters: () => void
	resetAppliedFilters: () => void
	initializeFilters: (filters: Partial<SearchState>) => void
}

export const useSearchStore = create<SearchState & SearchActions>()((set, get) => ({
	selectedDemographics: [],
	appliedDemographics: [],
	selectedOriginalLangs: [],
	appliedOriginalLangs: [],
	selectedTranslatedLangs: [],
	appliedTranslatedLangs: [],
	selectedIncludedTags: [],
	selectedExcludedTags: [],
	appliedIncludedTags: [],
	appliedExcludedTags: [],

	setSelectedDemographics: demos => set({ selectedDemographics: demos }),
	setSelectedOriginalLangs: originLang => set({ selectedOriginalLangs: originLang }),
	setSelectedTranslatedLangs: translatedLang => set({ selectedTranslatedLangs: translatedLang }),
	setSelectedIncludedTags: includedTags => set({ selectedIncludedTags: includedTags }),
	setSelectedExcludedTags: excludedTags => set({ selectedExcludedTags: excludedTags }),

	applyFilters: () =>
		set({
			appliedDemographics: get().selectedDemographics,
			appliedOriginalLangs: get().selectedOriginalLangs,
			appliedTranslatedLangs: get().selectedTranslatedLangs,
			appliedIncludedTags: get().selectedIncludedTags,
			appliedExcludedTags: get().selectedExcludedTags
		}),
	resetSelectedFilters: () =>
		set({
			selectedDemographics: [],
			appliedDemographics: [],
			selectedOriginalLangs: [],
			appliedOriginalLangs: [],
			selectedTranslatedLangs: [],
			appliedTranslatedLangs: [],
			selectedIncludedTags: [],
			appliedIncludedTags: [],
			selectedExcludedTags: [],
			appliedExcludedTags: []
		}),
	resetAppliedFilters: () =>
		set({
			appliedDemographics: [],
			appliedOriginalLangs: [],
			appliedTranslatedLangs: [],
			appliedExcludedTags: [],
			appliedIncludedTags: []
		}),
	initializeFilters: filters => {
		const appliedDemos = filters.appliedDemographics ?? []
		const appliedOriginLangs = filters.appliedOriginalLangs ?? []
		const appliedTransLangs = filters.appliedTranslatedLangs ?? []
		const appliedIncTags = filters.appliedIncludedTags ?? []
		const appliedExcTags = filters.appliedExcludedTags ?? []
		set({
			appliedDemographics: appliedDemos,
			selectedDemographics: appliedDemos,
			appliedOriginalLangs: appliedOriginLangs,
			selectedOriginalLangs: appliedOriginLangs,
			appliedTranslatedLangs: appliedTransLangs,
			selectedTranslatedLangs: appliedTransLangs,
			appliedIncludedTags: appliedIncTags,
			selectedIncludedTags: appliedIncTags,
			appliedExcludedTags: appliedExcTags,
			selectedExcludedTags: appliedExcTags
		})
	}
}))
