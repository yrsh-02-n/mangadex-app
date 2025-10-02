'use client'

import cn from 'clsx'
import { useEffect, useState } from 'react'

import { ModifyButton } from '@/components/ui/button/ModifyButton'
import { Heading } from '@/components/ui/heading/Heading'

import { useUserProfile } from '@/hooks/useUserProfile'
import { useUpdateUsername } from '@/hooks/user-data/useUpdateUsername'

import { UpdateNameForm } from './forms/UpdateNameForm'

export function SettingsUsername() {
	const { data: profile, isLoading } = useUserProfile()
	const updateMutation = useUpdateUsername()
	const username = profile?.username
	const [currentUsername, setCurrentUsername] = useState<string>('')
	const [readyToUpdate, setReadyToUpdate] = useState<boolean>(false)

	useEffect(() => {
		if (username) {
			setCurrentUsername(username)
		}
	}, [username])

	return (
		<div className='flex flex-col gap-[1rem] w-[300px]'>
			<Heading
				isH1={false}
				className='mb-0'
			>
				Ваш никнейм:
			</Heading>
			{!isLoading && (
				<div className='flex flex-col gap-[1rem]'>
					<div className='flex items-end gap-[.8rem]'>
						<p className='text-xl'>{currentUsername}</p>
						<ModifyButton
							onClick={() => setReadyToUpdate(true)}
							disabled={updateMutation.isPending}
							classname={cn('text-xs text-white/50', readyToUpdate && 'hidden')}
						>
							Изменить никнейм
						</ModifyButton>
					</div>
					<UpdateNameForm
						isShow={readyToUpdate}
						classname='w-full'
						onSuccess={() => setReadyToUpdate(false)}
					/>
				</div>
			)}
		</div>
	)
}
