import Image from 'next/image'

import { SkeletonLoader } from '@/components/ui/skeletonLoader/SkeletonLoader'

import { useUserProfile } from '@/hooks/useUserProfile'

export function UserMenu() {
	const { data: profile, isLoading } = useUserProfile()

	const avatarUrl = profile?.avatar_url ? profile.avatar_url : '/user/avatar-placeholder.png'
	return (
		<button>
			<div className='relative w-[32px] h-[32px]'>
				{isLoading ? (
					<SkeletonLoader
						count={1}
						className='w-[32px] h-[32px] rounded-full bg-stone-700 flex-shrink-0'
					/>
				) : (
					<Image
						src={avatarUrl}
						fill
						sizes='32'
						alt='Ваш аккаунт'
						className='object-cover shrink-0 rounded-full'
					/>
				)}
			</div>
		</button>
	)
}
