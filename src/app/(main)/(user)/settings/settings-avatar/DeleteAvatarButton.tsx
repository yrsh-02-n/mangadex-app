import toast from 'react-hot-toast'

import { useUserStore } from '@/store/user.store'

import { createClient } from '@/utils/supabase/client'
import { extractFileNameFromUrl } from '@/utils/supabase/extractFilenameFromUrl'
import { isPlaceholderAvatar } from '@/utils/supabase/isPlaceholderAvatar'
import { deleteAvatar } from '@/utils/supabase/userActions/deleteAvatar'

export const DeleteAvatarbutton = () => {
	const { profile, fetchProfile } = useUserStore()
	const supabase = createClient()

	const handleDeleteAvatar = async () => {
		if (!profile?.avatar_url) return

		const currentAvatarPath = profile.avatar_url

		const fileName = extractFileNameFromUrl(currentAvatarPath)

		if (fileName && !isPlaceholderAvatar(fileName)) {
			try {
				await deleteAvatar(fileName)
			} catch (deleteError: any) {
				toast.error('Не удалось удалить аватарку')
				return
			}
		}

		const userResponse = await supabase.auth.getUser()
		if (userResponse.error) {
			console.error('Ошибка получения пользователя:', userResponse.error)
			toast.error('Ошибка авторизации')
			return
		}

		const user = userResponse.data.user
		if (!user) {
			toast.error('Пользователь не авторизован')
			return
		}

		const { error: profileUpdateError } = await supabase
			.from('profiles')
			.update({ avatar_url: null })
			.eq('id', user.id)

		if (profileUpdateError) {
			console.error('Ошибка обновления профиля:', profileUpdateError)
			toast.error('Не удалось обновить профиль')
			return
		}

		await fetchProfile()
		toast.success('Аватарка успешно удалена')
	}

	return (
		<div>
			или{' '}
			<button
				onClick={e => {
					e.stopPropagation()
					handleDeleteAvatar()
				}}
				className='border-b border-white hover:border-accent hover:text-accent transition-colors duration-200'
			>
				удалите аватарку
			</button>
		</div>
	)
}
