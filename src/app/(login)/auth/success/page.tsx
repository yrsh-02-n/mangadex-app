'use client'

import { Heading } from '@/components/ui/heading/Heading'

import { useIsAuthRedirect } from '@/hooks/useIsAuthRedirect'

export default function PasswordRecoveryPage() {
	useIsAuthRedirect()

	return (
		<div className='flex justify-center items-center h-screen p-[1.5rem]'>
			<div className='flex flex-col bg-primary items-center rounded p-[1.5rem] max-w-[30rem] min-w-[300px]'>
				<div className='text-center'>
					<Heading
						isH1
						className='mb-[.5rem]'
					>
						Регистрация прошла успешно
					</Heading>
					<p className='max-xs:text-xs'>
						Подтвердите регистрацию при помощи ссылки, пришедшей на ваш email
					</p>
				</div>
			</div>
		</div>
	)
}
