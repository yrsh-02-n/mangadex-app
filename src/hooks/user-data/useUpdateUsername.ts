import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { createClient } from '@/utils/supabase/client'

export const useUpdateUsername = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (username: string) => {
			const supabase = createClient()
			const userResponse = await supabase.auth.getUser()
			const user = userResponse.data.user

			if (!user) throw new Error('Пользователь не авторизован')

			const newUsername = username.trim()

			// update username
			const { error: profileUpdateError } = await supabase
				.from('profiles')
				.update({ username: newUsername })
				.eq('id', user.id)

			if (profileUpdateError) throw profileUpdateError

			return newUsername
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['userProfile'] })
			toast.success('Никнейм успешно изменен')
		}
	})
}
