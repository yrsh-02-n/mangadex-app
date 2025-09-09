import Cookies from 'js-cookie'
import { create } from 'zustand'

interface ISidebarState {
	isSidebarOpen: boolean
	toggleSidebar: () => void
}

interface IModalSearchState {
	isSearchModalOpen: boolean
	searchTerm: string
	setSearchTerm: (term: string) => void
	openSearchModal: () => void
	closeSearchModal: () => void
}

const getInitialState = () => {
	if (typeof window === 'undefined') return true

	const saved = Cookies.get('sidebar-state')
	if (window.innerWidth > 748) return saved ? JSON.parse(saved) : true
}

export const useSidebarStore = create<ISidebarState>(set => ({
	isSidebarOpen: getInitialState(),
	toggleSidebar: () =>
		set(state => {
			const newState = !state.isSidebarOpen

			Cookies.set('sidebar-state', JSON.stringify(newState), {
				expires: 365,
				samesite: 'lax'
			})
			return { isSidebarOpen: newState }
		})
}))

export const useSearchModalState = create<IModalSearchState>()(set => ({
	isSearchModalOpen: false,
	searchTerm: '',
	setSearchTerm: term => set({ searchTerm: term }),
	openSearchModal: () => set({ isSearchModalOpen: true }),
	closeSearchModal: () => set({ isSearchModalOpen: false })
}))
