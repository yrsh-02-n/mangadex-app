'use client'

import { ModifyButton } from '@/components/ui/button/ModifyButton'
import { Heading } from '@/components/ui/heading/Heading'

import { useUserProfile } from '@/hooks/useUserProfile'

export function SettingsUsername() {
	const { data: profile } = useUserProfile()

	return (
		<div className='flex flex-col gap-[1rem]'>
			<Heading
				isH1={false}
				className='mb-0'
			>
				Ваш никнейм:
			</Heading>
			<div>
				<p className='text-xl'>{profile?.username}</p>
				{/* <ModifyButton
				onClick={() => deleteMutation.mutate()}
				disabled={deleteMutation.isPending}
			>
				удалите аватар
			</ModifyButton> */}
			</div>
		</div>
	)
}
