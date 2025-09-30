import { create } from 'zustand'

import { createClient } from '@/utils/supabase/client'

export interface UserProfile {
	id: string
	username: string | null
	avatar_url: string | null
}

interface UserState {
	profile: UserProfile | null
	loading: boolean
	error: string | null
	fetchProfile: () => Promise<void>
	updateAvatar: (avatar_url: string) => void
}

export const useUserStore = create<UserState>(set => ({
	profile: null,
	loading: false,
	error: null,

	fetchProfile: async () => {
		set({ loading: true, error: null })

		const supabase = createClient()
		const {
			data: { user }
		} = await supabase.auth.getUser()

		if (!user) {
			set({ loading: false, error: 'Пользователь не авторизован' })
			return
		}

		const { data, error } = await supabase
			.from('profiles')
			.select('id, username, avatar_url')
			.eq('id', user.id)
			.single()

		if (error) {
			set({ error: error.message, loading: false })
		} else {
			set({ profile: data, loading: false })
		}
	},

	updateAvatar: (avatar_url: string) => {
		set(state => ({
			profile: state.profile ? { ...state.profile, avatar_url } : null
		}))
	}
}))
