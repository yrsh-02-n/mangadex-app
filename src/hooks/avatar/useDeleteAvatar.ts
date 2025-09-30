import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createClient } from '@/utils/supabase/client'
import { extractFileNameFromUrl } from '@/utils/supabase/extractFilenameFromUrl'
import { isPlaceholderAvatar } from '@/utils/supabase/isPlaceholderAvatar'
import { deleteAvatar as deleteFile } from '@/utils/supabase/userActions/deleteAvatar'

export const useDeleteAvatar = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async () => {
			const supabase = createClient()
			const userResponse = await supabase.auth.getUser()

			const user = userResponse.data.user
			if (!user) throw new Error('Пользователь не авторизован')

			const { data: profileData, error: profileFetchError } = await supabase
				.from('profiles')
				.select('avatar_url')
				.eq('id', user.id)
				.single()

			if (profileFetchError) throw profileFetchError

			const currentAvatarPath = profileData?.avatar_url

			if (currentAvatarPath) {
				const fileName = extractFileNameFromUrl(currentAvatarPath)
				if (fileName && !isPlaceholderAvatar(fileName)) {
					await deleteFile(fileName)
				}
			}

			// set avatar url for null
			const { error: profileUpdateError } = await supabase
				.from('profiles')
				.update({ avatar_url: null })
				.eq('id', user.id)

			if (profileUpdateError) throw profileUpdateError
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['userProfile'] })
		}
	})
}
