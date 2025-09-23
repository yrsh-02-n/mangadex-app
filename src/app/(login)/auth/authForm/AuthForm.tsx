'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Logo } from '@/components/header/logo/Logo'
import { Button } from '@/components/ui/button/Button'
import { DefaultField } from '@/components/ui/fields/DefaultField'
import { Tab } from '@/components/ui/tab/Tab'

import { useAuth } from '@/utils/useAuth'

import { handleLogin, handleSignup } from './auth.handlers'
import { loginSchema, registerSchema } from './schemas/auth.schemas'
import { AuthFormData } from '@/types/auth.types'

export function AuthForm() {
	const router = useRouter()
	const { isAuthenticated } = useAuth()
	const [formType, setFormType] = useState<'register' | 'login'>('login')
	const { control, handleSubmit } = useForm<AuthFormData>({
		resolver: zodResolver(formType === 'register' ? registerSchema : loginSchema),
		defaultValues: {
			email: '',
			password: '',
			name: '',
			confirmPassword: ''
		}
	})

	useEffect(() => {
		if (isAuthenticated) {
			router.push('/')
		}
	}, [isAuthenticated, router])

	const onSubmit = async (data: AuthFormData) => {
		try {
			if (formType === 'register') {
				await handleSignup(data, router)
			} else {
				await handleLogin(data, router)
			}
		} catch (error: any) {
			alert(error.message)
		}
	}

	return (
		<div>
			<div className='flex justify-center w-full mb-[2rem]'>
				<Logo isSidebarOpen={true} />
			</div>
			<div className='flex mb-[1rem]'>
				<Tab
					onClick={() => setFormType('login')}
					name='Вход'
					isActive={formType === 'login'}
				/>
				<Tab
					onClick={() => setFormType('register')}
					name='Регистрация'
					isActive={formType === 'register'}
				/>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col gap-[1.5rem] min-w-[500px]'
			>
				{formType === 'register' && (
					<Controller
						name='name'
						control={control}
						rules={{ required: true }}
						render={({ field, fieldState }) => (
							<DefaultField
								id='name'
								type='text'
								placeholder='Имя или никнейм'
								className='w-full'
								size='md'
								variant='default'
								error={fieldState.error?.message}
								{...field}
							/>
						)}
					/>
				)}

				<Controller
					name='email'
					control={control}
					render={({ field, fieldState }) => (
						<DefaultField
							id='email'
							type='email'
							placeholder='email'
							className='w-full'
							size='md'
							variant='default'
							error={fieldState.error?.message}
							{...field}
						/>
					)}
				/>

				<Controller
					name='password'
					control={control}
					render={({ field, fieldState }) => (
						<DefaultField
							id='password'
							type='password'
							placeholder='Пароль'
							className='w-full'
							size='md'
							variant='default'
							error={fieldState.error?.message}
							{...field}
						/>
					)}
				/>

				{formType === 'register' && (
					<Controller
						name='confirmPassword'
						control={control}
						rules={{ required: true }}
						render={({ field, fieldState }) => (
							<DefaultField
								id='password'
								type='password'
								placeholder='Повторите пароль'
								className='w-full'
								size='md'
								variant='default'
								error={fieldState.error?.message}
								{...field}
							/>
						)}
					/>
				)}

				<div className='flex w-full gap-[1rem]'>
					<Button
						variable='primary'
						className='w-full'
						type='submit'
					>
						{formType === 'login' ? 'Войти' : 'Зарегистрироваться'}
					</Button>
				</div>
			</form>
		</div>
	)
}
