import { useQuery } from '@tanstack/react-query'

import { createClient } from '@/utils/supabase/client'

export const useUserProfile = () => {
	return useQuery({
		queryKey: ['userProfile'],
		queryFn: async () => {
			const supabase = await createClient()
			const userResponse = await supabase.auth.getUser()
			if (userResponse.error) throw userResponse.error

			const user = userResponse.data.user
			if (!user) throw new Error('Пользователь не авторизован')

			const { data, error } = await supabase
				.from('profiles')
				.select('id, username, avatar_url')
				.eq('id', user.id)
				.single()

			if (error) throw error

			return data
		},
		staleTime: 5 * 60 * 1000 // 5 min
	})
}
