'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'

import { SkeletonLoader } from '@/components/ui/skeletonLoader/SkeletonLoader'

import { useUserStore } from '@/store/user.store'

import { createClient } from '@/utils/supabase/client'
import { extractFileNameFromUrl } from '@/utils/supabase/extractFilenameFromUrl'
import { isPlaceholderAvatar } from '@/utils/supabase/isPlaceholderAvatar'
import { deleteAvatar } from '@/utils/supabase/userActions/deleteAvatar'

export function SettingsAvatar() {
	const { profile, fetchProfile, loading } = useUserStore()
	const [uploading, setUploading] = useState<boolean>(false)
	const supabase = createClient()

	useEffect(() => {
		fetchProfile()
	}, [fetchProfile])

	const onDrop = async (acceptedFiles: File[]) => {
		if (!acceptedFiles[0]) return

		const file = acceptedFiles[0]
		setUploading(true)

		try {
			const cleanFileName = file.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '')

			const { error: uploadError } = await supabase.storage
				.from('avatars')
				.upload(cleanFileName, file, {
					cacheControl: '3600',
					upsert: false
				})

			if (uploadError) throw uploadError

			const { data } = supabase.storage.from('avatars').getPublicUrl(cleanFileName)
			const publicUrl = data.publicUrl

			const userResponse = await supabase.auth.getUser()
			if (userResponse.error) throw userResponse.error

			const user = userResponse.data.user
			if (!user) throw new Error('Пользователь не авторизован')

			const { data: profileData, error: profileFetchError } = await supabase
				.from('profiles')
				.select('avatar_url')
				.eq('id', user.id)
				.single()

			if (profileFetchError) throw profileFetchError

			const oldAvatarPath = profileData?.avatar_url

			const { error: profileUpdateError } = await supabase
				.from('profiles')
				.update({ avatar_url: publicUrl })
				.eq('id', user.id)

			if (profileUpdateError) throw profileUpdateError

			if (oldAvatarPath) {
				const oldFileName = extractFileNameFromUrl(oldAvatarPath)

				if (oldFileName && !isPlaceholderAvatar(oldFileName)) {
					// API route for deleting
					try {
						await deleteAvatar(oldFileName)
					} catch (deleteError: any) {}
				}
			}

			await fetchProfile()
			toast.success('Аватарка успешно загружена!')
		} catch (error: any) {
			console.error('Ошибка при загрузке аватарки:', error)
			toast.error('Произошла ошибка при загрузке аватарки')
		} finally {
			setUploading(false)
		}
	}

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
		maxFiles: 1,
		multiple: false
	})

	const avatarUrl = profile?.avatar_url || '/user/avatar-placeholder.png'

	return (
		<div className='flex gap-[2rem]'>
			{loading ? (
				<SkeletonLoader
					count={1}
					className='w-[150px] h-[150px] rounded-full bg-stone-700 flex-shrink-0'
				/>
			) : (
				<div className='relative w-[150px] h-[150px] flex-shrink-0'>
					<Image
						src={avatarUrl}
						fill
						quality={100}
						priority
						alt='Аватар пользователя'
						className='rounded-full max-h-[150px] max-w-[150px] object-cover'
					/>
				</div>
			)}
			<div
				{...getRootProps()}
				className={`flex items-center justify-center border-2 border-dashed rounded p-6 text-center cursor-pointer w-full hover:border-accent hover:bg-bg/30 transition-all duration-300 ${
					isDragActive ? 'border-accent bg-bg/30' : 'border-white'
				}`}
			>
				<input {...getInputProps()} />
				{uploading ? (
					<p>Загрузка...</p>
				) : (
					<p>{isDragActive ? 'Отпустите файл здесь' : 'Перетащите аватар сюда (максимум 1 МБ)'}</p>
				)}
			</div>
		</div>
	)
}
