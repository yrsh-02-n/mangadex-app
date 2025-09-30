'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'

import { SkeletonLoader } from '@/components/ui/skeletonLoader/SkeletonLoader'

import { useDeleteAvatar } from '@/hooks/avatar/useDeleteAvatar'
import { useUpdateAvatar } from '@/hooks/avatar/useUpdateAvatar'
import { useUserProfile } from '@/hooks/useUserProfile'

export function SettingsAvatar() {
	const { data: profile, isLoading } = useUserProfile()
	const updateMutation = useUpdateAvatar()
	const deleteMutation = useDeleteAvatar()

	const [imageError, setImageError] = useState<boolean>(false)
	const placeholderUrl = '/user/avatar-placeholder.png'

	const onDrop = async (acceptedFiles: File[]) => {
		if (!acceptedFiles[0]) return

		updateMutation.mutate(acceptedFiles[0], {
			onSuccess: () => {
				toast.success('Аватарка успешно загружена!')
				setImageError(false)
			},
			onError: (error: any) => {
				console.error('Ошибка при загрузке аватарки:', error)
				toast.error('Произошла ошибка при загрузке аватарки')
			}
		})
	}

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
		maxFiles: 1,
		multiple: false
	})

	// show placeholder if app cant get avatar url
	const avatarUrl = !imageError && profile?.avatar_url ? profile.avatar_url : placeholderUrl

	return (
		<div className='flex gap-[2rem]'>
			{isLoading ? (
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
						onError={() => setImageError(true)}
						onLoad={() => setImageError(false)}
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
				{updateMutation.isPending ? (
					<p>Загрузка...</p>
				) : (
					<div className='flex flex-col'>
						<p>
							{isDragActive ? 'Отпустите файл здесь' : 'Перетащите аватар сюда (максимум 1 МБ)'}
						</p>
						{profile?.avatar_url && !deleteMutation.isPending && (
							<div onClick={e => e.stopPropagation()}>
								<span>или </span>
								<button
									onClick={() => deleteMutation.mutate()}
									disabled={deleteMutation.isPending}
									className='text-white border-b border-white hover:text-accent hover:border-accent transition-colors duration-200'
								>
									удалите аватар
								</button>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	)
}
