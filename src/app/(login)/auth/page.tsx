import Image from 'next/image'

import { AuthForm } from './authForm/AuthForm'

export default function AuthPage() {
	return (
		<div className='grid grid-cols-[35%_65%] grid-rows-1 min-h-screen max-lg:flex max-lg:justify-center max-lg:items-center max-lg:relative max-lg:overflow-hidden'>
			<div className='relative w-full h-screen min-h-screen aspect-[3/4] max-lg:absolute max-lg:opacity-5 max-lg:aspect-auto z-[-1] max-lg:w-full max-lg:inset-0'>
				<Image
					fill
					alt='Страница авторизации'
					src={'/auth-img.jpg'}
					quality={50}
					priority
					className='object-cover'
					unoptimized
				/>
			</div>
			<div className='flex items-center justify-center max-lg:w-full'>
				<AuthForm />
			</div>
		</div>
	)
}
