import { Heading } from '@/components/ui/heading/Heading'

import { SettingsAvatar } from './settings-avatar/SettingsAvatar'
import { SettingsUsername } from './settings-username/SettingsUsername'

export default async function UserSettingsPage() {
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
