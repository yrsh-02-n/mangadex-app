'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Logo } from '@/components/header/logo/Logo'
import { Button } from '@/components/ui/button/Button'
import { DefaultField } from '@/components/ui/fields/DefaultField'
import { Tab } from '@/components/ui/tab/Tab'

import { onSubmitLogin, onSubmitSignup } from '@/utils/supabase/authUtils'

import { AuthFormData } from '@/types/auth.types'

const authSchema = z.object({
	email: z.string({ message: 'Неверный формат email' }),
	password: z.string().min(6, { message: 'Пароль должен быть минимум 6 символов' }),
	name: z.string().min(1, { message: 'Имя обязательно' })
})

export function AuthForm() {
	const router = useRouter()
	const [formType, setFormType] = useState<'register' | 'login'>('login')

	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<AuthFormData>({
		resolver: zodResolver(authSchema),
		defaultValues: {
			email: '',
			password: '',
			name: ''
		}
	})

	const changeFormRegister = () => setFormType('register')
	const changeFormLogin = () => setFormType('login')

	return (
		<div>
			<div className='flex justify-center w-full mb-[2rem]'>
				<Logo isSidebarOpen={true} />
			</div>
			<div className='flex mb-[1rem]'>
				<Tab
					onClick={changeFormLogin}
					name='Вход'
					isActive={formType === 'login'}
				/>
				<Tab
					onClick={changeFormRegister}
					name='Регистрация'
					isActive={formType === 'register'}
				/>
			</div>
			<form className='flex flex-col gap-[1.5rem] min-w-[500px]'>
				{formType === 'register' && (
					<Controller
						name='name'
						control={control}
						render={({ field }) => (
							<DefaultField
								id='name'
								type='name'
								placeholder='Имя или никнейм'
								required
								className='w-full'
								size='md'
								variant='default'
								error={errors.name?.message}
								{...field}
							/>
						)}
					/>
				)}
				<Controller
					name='email'
					control={control}
					render={({ field }) => (
						<DefaultField
							id='email'
							type='email'
							placeholder='email'
							required
							className='w-full'
							size='md'
							variant='default'
							error={errors.email?.message}
							{...field}
						/>
					)}
				/>
				<Controller
					name='password'
					control={control}
					render={({ field }) => (
						<DefaultField
							id='password'
							type='password'
							placeholder='Пароль'
							required
							className='w-full'
							size='md'
							variant='default'
							error={errors.password?.message}
							{...field}
						/>
					)}
				/>
				<div className='flex w-full gap-[1rem]'>
					<Button
						variable='primary'
						onClick={
							formType === 'login' ? handleSubmit(onSubmitLogin) : handleSubmit(onSubmitSignup)
						}
						className='w-full'
						type='button'
					>
						{formType === 'login' ? 'Войти' : 'Зарегистрироваться'}
					</Button>
				</div>
			</form>
		</div>
	)
}
