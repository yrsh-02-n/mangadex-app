'use client'

import cn from 'clsx'
import { useEffect, useState } from 'react'

import { ModifyButton } from '@/components/ui/button/ModifyButton'
import { Heading } from '@/components/ui/heading/Heading'

import { useUpdateEmail } from '@/hooks/user-data/useUpdateEmail'

import { useUserEmail } from '@/utils/supabase/userActions/useUserEmail'

import { UpdateEmailForm } from './forms/UpdateEmailForm'

export function SettingsEmail() {
	const { data: email, isLoading } = useUserEmail()
	const updateMutation = useUpdateEmail()
	const [readyToUpdate, setReadyToUpdate] = useState<boolean>(false)

	const [currentEmail, setCurrentEmail] = useState<string>('')

	useEffect(() => {
		if (email) {
			setCurrentEmail(email)
		}
	}, [email])

	return (
		<div className='flex flex-col gap-[1rem] w-[300px] max-md:w-full'>
			<Heading
				isH1={false}
				className='mb-0'
			>
				Ваш email:
			</Heading>
			{!isLoading && (
				<div className='flex flex-col gap-[1rem] max-md:gap-[.5rem]'>
					<div className='flex items-end gap-[.8rem] max-s:flex-col max-s:items-start max-s:gap-0'>
						<p className='text-lg'>{currentEmail}</p>
						<ModifyButton
							onClick={() => setReadyToUpdate(true)}
							disabled={updateMutation.isPending}
							classname={cn('text-xs text-white/50', readyToUpdate && 'hidden')}
						>
							Изменить email
						</ModifyButton>
					</div>
					<UpdateEmailForm
						isShow={readyToUpdate}
						classname='w-full'
						onSuccess={() => setReadyToUpdate(false)}
					/>
				</div>
			)}
		</div>
	)
}
