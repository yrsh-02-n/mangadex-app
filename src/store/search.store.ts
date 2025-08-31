import { create } from 'zustand'

export interface SearchState {
	selectedDemographics: string[]
	appliedDemographics: string[]
	selectedOriginalLangs: string[]
	appliedOriginalLangs: string[]
	selectedTranslatedLangs: string[]
	appliedTranslatedLangs: string[]
}

interface SearchActions {
	setSelectedDemographics: (demos: string[]) => void
	setSelectedOriginalLangs: (originLang: string[]) => void
	setSelectedTranslatedLangs: (translatedLang: string[]) => void
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

	setSelectedDemographics: demos => set({ selectedDemographics: demos }),
	setSelectedOriginalLangs: originLang => set({ selectedOriginalLangs: originLang }),
	setSelectedTranslatedLangs: translatedLang => set({ selectedTranslatedLangs: translatedLang }),

	applyFilters: () =>
		set({
			appliedDemographics: get().selectedDemographics,
			appliedOriginalLangs: get().selectedOriginalLangs,
			appliedTranslatedLangs: get().selectedTranslatedLangs
		}),
	resetSelectedFilters: () =>
		set({
			selectedDemographics: [],
			appliedDemographics: [],
			selectedOriginalLangs: [],
			appliedOriginalLangs: [],
			selectedTranslatedLangs: [],
			appliedTranslatedLangs: []
		}),
	resetAppliedFilters: () =>
		set({
			appliedDemographics: [],
			appliedOriginalLangs: [],
			appliedTranslatedLangs: []
		}),
	initializeFilters: filters => {
		const appliedDemos = filters.appliedDemographics ?? []
		const appliedOriginLangs = filters.appliedOriginalLangs ?? []
		const appliedTransLangs = filters.appliedTranslatedLangs ?? []
		set({
			appliedDemographics: appliedDemos,
			selectedDemographics: appliedDemos,
			appliedOriginalLangs: appliedOriginLangs,
			selectedOriginalLangs: appliedOriginLangs,
			appliedTranslatedLangs: appliedTransLangs,
			selectedTranslatedLangs: appliedTransLangs
		})
	}
}))
