import { redirect } from 'next/navigation'

import { Heading } from '@/components/ui/heading/Heading'

import { createClient } from '@/utils/supabase/server'
import { getUser } from '@/utils/supabase/userActions/getUser'

import { SettingsAvatar } from './settings-avatar/SettingsAvatar'
import { SettingsUsername } from './settings-username/SettingsUsername'

export default async function UserSettingsPage() {
	const supabase = await createClient()

	const user = await getUser()

	const { data: profile, error: profileError } = await supabase
		.from('profiles')
		.select('username, avatar_url')
		.eq('id', user.id)
		.single()

	if (profileError) {
		console.error('Profile query error:', profileError)
	}

	const username = profile?.username || 'Гость'

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
				<SettingsUsername />
			</div>
		</section>
	)
}
