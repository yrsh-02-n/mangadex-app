'use client'

import cn from 'clsx'
import { useState } from 'react'

import { Button } from '@/components/ui/button/Button'

import { useUpdatePassword } from '@/hooks/user-data/useUpdatePassword'

import { UpdatePasswordForm } from './forms/UpdatePasswordForm'

export function SettingsPassword() {
	const [readyToUpdate, setReadyToUpdate] = useState<boolean>(false)

	return (
		<div className='flex flex-col gap-[1rem] w-[300px] max-md:w-full'>
			<div className='flex'>
				<Button
					variable='primary'
					onClick={() => setReadyToUpdate(true)}
					className={cn('max-w-[200px]', readyToUpdate && 'hidden')}
				>
					Сменить пароль
				</Button>
				<UpdatePasswordForm
					isShow={readyToUpdate}
					classname='w-full'
					onSuccess={() => setReadyToUpdate(false)}
				/>
			</div>
		</div>
	)
}
