import { create } from 'zustand'

export interface SearchState {
	selectedDemographics: string[]
	appliedDemographics: string[]
}

interface SearchActions {
	setSelectedDemographics: (demos: string[]) => void
	applyFilters: () => void
	resetSelectedFilters: () => void
	resetAppliedFilters: () => void
	initializeFilters: (filters: Partial<SearchState>) => void
}

export const useSearchStore = create<SearchState & SearchActions>()((set, get) => ({
	selectedDemographics: [],
	appliedDemographics: [],

	setSelectedDemographics: demos => set({ selectedDemographics: demos }),

	applyFilters: () =>
		set({
			appliedDemographics: get().selectedDemographics
		}),
	resetSelectedFilters: () =>
		set({
			selectedDemographics: [],
			appliedDemographics: []
		}),
	resetAppliedFilters: () =>
		set({
			appliedDemographics: []
		}),
	initializeFilters: filters => {
		const appliedDemos = filters.appliedDemographics ?? []
		set({
			// appliedDemographics: filters.appliedDemographics ?? []
			appliedDemographics: appliedDemos,
			selectedDemographics: appliedDemos
		})
	}
}))
