import Image from 'next/image'

import { useUserProfile } from '@/hooks/useUserProfile'

export function UserMenu() {
	const { data: profile } = useUserProfile()

	const avatarUrl = profile?.avatar_url ? profile.avatar_url : '/user/avatar-placeholder.png'
	return (
		<button>
			<div className='relative w-[32px] h-[32px]'>
				<Image
					src={avatarUrl}
					fill
					sizes='32'
					alt='Ваш аккаунт'
					className='object-cover shrink-0 rounded-full'
				/>
			</div>
		</button>
	)
}
