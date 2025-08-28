import { create } from 'zustand'

export interface SearchState {
	selectedDemographics: string[]
	appliedDemographics: string[]
	selectedOriginalLangs: string[]
	appliedOriginalLangs: string[]
}

interface SearchActions {
	setSelectedDemographics: (demos: string[]) => void
	setSelectedOriginalLangs: (originLang: string[]) => void
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

	setSelectedDemographics: demos => set({ selectedDemographics: demos }),
	setSelectedOriginalLangs: originLang => set({ selectedOriginalLangs: originLang }),

	applyFilters: () =>
		set({
			appliedDemographics: get().selectedDemographics,
			appliedOriginalLangs: get().selectedOriginalLangs
		}),
	resetSelectedFilters: () =>
		set({
			selectedDemographics: [],
			appliedDemographics: [],
			selectedOriginalLangs: [],
			appliedOriginalLangs: []
		}),
	resetAppliedFilters: () =>
		set({
			appliedDemographics: [],
			appliedOriginalLangs: []
		}),
	initializeFilters: filters => {
		const appliedDemos = filters.appliedDemographics ?? []
		const appliedOriginLangs = filters.appliedOriginalLangs ?? []
		set({
			appliedDemographics: appliedDemos,
			selectedDemographics: appliedDemos,
			appliedOriginalLangs: appliedOriginLangs,
			selectedOriginalLangs: appliedOriginLangs
		})
	}
}))
