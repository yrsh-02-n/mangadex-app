'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button/Button'
import { DefaultField } from '@/components/ui/fields/DefaultField'
import { Heading } from '@/components/ui/heading/Heading'

import { resetPassword } from '@/utils/supabase/userActions/userActions'

import { resetPasswordSchema } from '../../../schemas/auth.schemas'

import { AuthFormData } from '@/types/user-types/auth.types'

type ResetPasswordFormData = Required<Pick<AuthFormData, 'confirmPassword' | 'password'>>

export default function PasswordResetPage() {
	const router = useRouter()
	const { control, handleSubmit } = useForm<ResetPasswordFormData>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: '',
			confirmPassword: ''
		}
	})

	const onSubmit = async (data: ResetPasswordFormData) => {
		try {
			await resetPassword(data.password)
			toast.success('Пароль успешно изменен.')
			router.push('/')
		} catch (error: any) {
			console.error('Reset password error:', error)
			toast.error('Произошла ошибка при смене пароля')
		}
	}

	return (
		<div className='flex justify-center items-center h-screen p-[1.5rem]'>
			<div className='flex flex-col bg-primary items-center rounded p-[1.5rem] max-w-[30rem] min-w-[300px]'>
				<div className='text-center'>
					<Heading
						isH1={false}
						className='mb-[1rem]'
					>
						Создать новый пароль
					</Heading>
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='w-full'
				>
					<div className='mb-[1rem]'>
						<Controller
							name='password'
							control={control}
							render={({ field, fieldState }) => (
								<DefaultField
									id='password'
									type='password'
									placeholder='Новый пароль'
									className='w-full bg-bg'
									size='md'
									variant='default'
									error={fieldState.error?.message}
									{...field}
								/>
							)}
						/>
					</div>
					<div className='mb-[1rem]'>
						<Controller
							name='confirmPassword'
							control={control}
							render={({ field, fieldState }) => (
								<DefaultField
									id='confirmPassword'
									type='password'
									placeholder='Повторите пароль'
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
						Подтвердить пароль
					</Button>
				</form>
			</div>
		</div>
	)
}
