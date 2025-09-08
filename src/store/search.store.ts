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

	selectedStatus: string[]
	appliedStatus: string[]

	selectedYear: number | undefined
	appliedYear: number | undefined

	selectedTitle: string | undefined
	appliedTitle: string | undefined
}

interface SearchActions {
	setSelectedDemographics: (demos: string[]) => void

	setSelectedOriginalLangs: (originLang: string[]) => void
	setSelectedTranslatedLangs: (translatedLang: string[]) => void

	setSelectedIncludedTags: (includedTags: string[]) => void
	setSelectedExcludedTags: (excludedTags: string[]) => void

	setSelectedStatus: (selectedStatus: string[]) => void

	setSelectedYear: (selectedYear: number | undefined) => void

	setSelectedTitle: (selectedTitle: string | undefined) => void

	applyFilters: () => void
	resetSelectedFilters: () => void
	resetAppliedFilters: () => void
	resetSelectedTitle: () => void
	resetAppliedTitle: () => void
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
	selectedStatus: [],
	appliedStatus: [],
	selectedYear: undefined,
	appliedYear: undefined,
	selectedTitle: undefined,
	appliedTitle: undefined,

	setSelectedDemographics: demos => set({ selectedDemographics: demos }),
	setSelectedOriginalLangs: originLang => set({ selectedOriginalLangs: originLang }),
	setSelectedTranslatedLangs: translatedLang => set({ selectedTranslatedLangs: translatedLang }),
	setSelectedIncludedTags: includedTags => set({ selectedIncludedTags: includedTags }),
	setSelectedExcludedTags: excludedTags => set({ selectedExcludedTags: excludedTags }),
	setSelectedStatus: status => set({ selectedStatus: status }),
	setSelectedYear: year => set({ selectedYear: year }),
	setSelectedTitle: title => set({ selectedTitle: title }),

	applyFilters: () =>
		set({
			appliedDemographics: get().selectedDemographics,
			appliedOriginalLangs: get().selectedOriginalLangs,
			appliedTranslatedLangs: get().selectedTranslatedLangs,
			appliedIncludedTags: get().selectedIncludedTags,
			appliedExcludedTags: get().selectedExcludedTags,
			appliedStatus: get().selectedStatus,
			appliedYear: get().selectedYear,
			appliedTitle: get().selectedTitle
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
			appliedExcludedTags: [],
			selectedStatus: [],
			appliedStatus: [],
			selectedYear: undefined,
			appliedYear: undefined,
			selectedTitle: undefined,
			appliedTitle: undefined
		}),
	resetAppliedFilters: () =>
		set({
			appliedDemographics: [],
			appliedOriginalLangs: [],
			appliedTranslatedLangs: [],
			appliedExcludedTags: [],
			appliedIncludedTags: [],
			appliedStatus: [],
			appliedYear: undefined,
			selectedTitle: undefined,
			appliedTitle: undefined
		}),
	resetSelectedTitle: () =>
		set({
			selectedTitle: undefined
		}),
	resetAppliedTitle: () =>
		set({
			appliedTitle: undefined
		}),
	initializeFilters: filters => {
		const appliedDemos = filters.appliedDemographics ?? []
		const appliedOriginLangs = filters.appliedOriginalLangs ?? []
		const appliedTransLangs = filters.appliedTranslatedLangs ?? []
		const appliedIncTags = filters.appliedIncludedTags ?? []
		const appliedExcTags = filters.appliedExcludedTags ?? []
		const appliedStatuses = filters.appliedStatus ?? []
		const appliedY = filters.appliedYear ?? undefined
		const appliedManga = filters.appliedTitle ?? undefined
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
			selectedExcludedTags: appliedExcTags,
			selectedStatus: appliedStatuses,
			appliedStatus: appliedStatuses,
			appliedYear: appliedY,
			selectedYear: appliedY,
			selectedTitle: appliedManga,
			appliedTitle: appliedManga
		})
	}
}))
