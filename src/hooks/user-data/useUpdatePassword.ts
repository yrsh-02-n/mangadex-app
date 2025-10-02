import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { createClient } from '@/utils/supabase/client'

export const useUpdatePassword = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (password: string) => {
			const supabase = createClient()

			const { error } = await supabase.auth.updateUser({
				password: password.trim()
			})

			if (error) throw error

			return password
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['userProfile'] })
			toast.success('Пароль успешно изменен')
		}
	})
}
