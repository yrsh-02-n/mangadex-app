'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button/Button'
import { DefaultField } from '@/components/ui/fields/DefaultField'
import { Heading } from '@/components/ui/heading/Heading'

import { useIsAuthRedirect } from '@/hooks/useIsAuthRedirect'

import { recoveryPassword } from '@/utils/supabase/userActions/userActions'

import { recoverySchema } from '../authForm/schemas/auth.schemas'

import { RecoveryFormData } from '@/types/auth.types'

export default function PasswordRecoveryPage() {
	const router = useRouter()
	const { control, handleSubmit } = useForm<RecoveryFormData>({
		resolver: zodResolver(recoverySchema),
		defaultValues: {
			email: ''
		}
	})

	useIsAuthRedirect()

	const onSubmit = async (formData: RecoveryFormData) => {
		try {
			await recoveryPassword(formData.email)

			toast.success('Код для восстановления отправлен на ваш email.')
			router.push(`/auth/verify-otp?email=${encodeURIComponent(formData.email)}`)
		} catch (error: any) {
			console.error('Recovery error:', error)
			toast.error('Произошла ошибка при отправке запроса.')
		}
	}

	return (
		<div className='flex justify-center items-center h-screen p-[1.5rem]'>
			<div className='flex flex-col bg-primary items-center rounded p-[1.5rem] max-w-[30rem] min-w-[300px]'>
				<div className='text-center mb-[1rem]'>
					<Heading
						isH1={false}
						className='mb-0'
					>
						Восстановление пароля
					</Heading>
					<p className='max-xs:text-xs'>Введите email, и получите 6-значный код для сброса пароля на почте</p>
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='w-full'
				>
					<div className='mb-[1rem]'>
						<Controller
							name='email'
							control={control}
							render={({ field, fieldState }) => (
								<DefaultField
									id='email'
									type='email'
									placeholder='Email указанный при регистрации'
									className='w-full bg-bg'
									size='md'
									variant='default'
									error={fieldState.error?.message}
									{...field}
								/>
							)}
						/>
					</div>
					<Button
						variable='primary'
						className='w-full'
						type='submit'
					>
						Отправить код
					</Button>
				</form>
			</div>
		</div>
	)
}
