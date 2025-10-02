import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { createClient } from '@/utils/supabase/client'

export const useUpdateEmail = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (email: string) => {
			const supabase = createClient()

			const { error } = await supabase.auth.updateUser({
				email: email.trim()
			})

			if (error) throw error

			return email
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['userProfile'] })
			toast.success('Подтвердите смену на старом и новом email')
		}
	})
}
