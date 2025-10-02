'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { Heading } from '@/components/ui/heading/Heading'

import { useAuth } from '@/utils/supabase/userActions/useAuth'

import { SettingsAvatar } from './settings-avatar/SettingsAvatar'
import { SettingsEmail } from './settings-userdata/SettingsEmail'
import { SettingsPassword } from './settings-userdata/SettingsPassword'
import { SettingsUsername } from './settings-userdata/SettingsUsername'

export default function UserSettingsPage() {
	const router = useRouter()
	const { isAuthenticated, loading } = useAuth()

	useEffect(() => {
		if (!loading && !isAuthenticated) {
			router.push('/auth')
		}
	}, [isAuthenticated, loading, router])

	return (
		<section className='px-[1.5rem] mt-[6rem] pb-[2rem]'>
			<div className='flex flex-col gap-[1.5rem] bg-primary rounded p-[1.5rem]'>
				<div className='w-full pb-[1rem] border-b border-white mb-[1rem]'>
					<Heading
						isH1
						className='mb-0'
					>
						Настройки профиля
					</Heading>
				</div>
				<SettingsAvatar />
				<div className='flex gap-[4rem] w-full pb-[2rem] border-b border-white mb-[.5rem]'>
					<SettingsUsername />
					<SettingsEmail />
				</div>
				<div>
					<SettingsPassword />
				</div>
			</div>
		</section>
	)
}
