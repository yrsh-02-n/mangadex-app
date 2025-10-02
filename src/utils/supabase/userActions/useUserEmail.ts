import { useQuery } from '@tanstack/react-query'

import { createClient } from '../client'

export const useUserEmail = () => {
	return useQuery({
		queryKey: ['userEmail'],
		queryFn: async () => {
			const supabase = createClient()
			const { data, error } = await supabase.auth.getUser()

			if (error) throw error

			return data.user?.email
		}
	})
}
