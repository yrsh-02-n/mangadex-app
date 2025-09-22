import Image from 'next/image'

import { AuthForm } from './authForm/AuthForm'

export default function AuthPage() {
	return (
		<div className='grid grid-cols-[35%_65%] grid-rows-1 min-h-screen'>
			<div className='relative w-full h-screen min-h-screen aspect-[3/4]'>
				<Image
					fill
					alt='Страница авторизации'
					src={'/auth-img.jpg'}
					quality={50}
					priority
					className='object-cover'
				/>
			</div>
			<div className='flex items-center justify-center'>
				<AuthForm />
			</div>
		</div>
	)
}
