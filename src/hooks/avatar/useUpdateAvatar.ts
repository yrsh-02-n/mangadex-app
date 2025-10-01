import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createClient } from '@/utils/supabase/client'
import { extractFileNameFromUrl } from '@/utils/supabase/extractFilenameFromUrl'
import { isPlaceholderAvatar } from '@/utils/supabase/isPlaceholderAvatar'
import { deleteAvatar } from '@/utils/supabase/userActions/deleteAvatar'

export const useUpdateAvatar = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (file: File) => {
			const supabase = createClient()
			const cleanFileName = file.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '')
			const userResponse = await supabase.auth.getUser()

			// upload file
			const { error: uploadError } = await supabase.storage
				.from('avatars')
				.upload(cleanFileName, file, { cacheControl: '3600', upsert: false })

			if (uploadError) throw uploadError

			const { data } = supabase.storage.from('avatars').getPublicUrl(cleanFileName)
			const publicUrl = data.publicUrl

			const user = userResponse.data.user
			if (!user) throw new Error('Пользователь не авторизован')

			// get old avatar url
			const { data: profileData, error: profileFetchError } = await supabase
				.from('profiles')
				.select('avatar_url')
				.eq('id', user.id)
				.single()

			if (profileFetchError) throw profileFetchError

			const oldAvatarPath = profileData?.avatar_url

			// update profile
			const { error: profileUpdateError } = await supabase
				.from('profiles')
				.update({ avatar_url: publicUrl })
				.eq('id', user.id)

			if (profileUpdateError) throw profileUpdateError

			// delete old avatar
			if (oldAvatarPath) {
				const oldFileName = extractFileNameFromUrl(oldAvatarPath)
				if (oldFileName && !isPlaceholderAvatar(oldFileName)) {
					await deleteAvatar(oldFileName)
				}
			}

			return publicUrl
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['updateAvatar'] })
		}
	})
}
