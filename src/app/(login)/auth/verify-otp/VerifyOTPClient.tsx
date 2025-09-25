'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button/Button'
import { DefaultField } from '@/components/ui/fields/DefaultField'
import { Heading } from '@/components/ui/heading/Heading'

import { createClient } from '@/utils/supabase/client'

import { otpVerificationSchema } from '../authForm/schemas/auth.schemas'

import { OTPVerificationFormData } from '@/types/auth.types'

export default function VerifyOTPClient() {
	const [email, setEmail] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()
	const searchParams = useSearchParams()
	const supabase = createClient()

	useEffect(() => {
		const emailFromUrl = searchParams.get('email')
		if (emailFromUrl) {
			setEmail(emailFromUrl)
		} else {
			toast.error('Email не указан. Повторите запрос.')
			router.push('/auth/password-recovery')
		}
	}, [searchParams, router])

	const { control, handleSubmit } = useForm<OTPVerificationFormData>({
		resolver: zodResolver(otpVerificationSchema),
		defaultValues: {
			otp: ''
		}
	})

	const onSubmit = async (data: OTPVerificationFormData) => {
		setIsLoading(true)

		try {
			const { error } = await supabase.auth.verifyOtp({
				email,
				token: data.otp,
				type: 'recovery'
			})

			if (error) throw error

			toast.success('Код подтверждён! Придумайте новый пароль.')
			router.push('/auth/password-reset')
		} catch (error: any) {
			console.error('OTP verification error:', error)
			toast.error('Ошибка при подтверждении кода')
		} finally {
			setIsLoading(false)
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
						Подтверждение кода
					</Heading>
					<p className='max-xs:text-xs'>Введите 6-значный код, отправленный на {email}</p>
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='w-full'
				>
					<div className='mb-[1rem]'>
						<Controller
							name='otp'
							control={control}
							render={({ field, fieldState }) => (
								<DefaultField
									id='otp'
									type='text'
									placeholder='6-значный код из email'
									className='w-full bg-bg'
									size='md'
									variant='default'
									maxLength={6}
									error={fieldState.error?.message}
									{...field}
								/>
							)}
						/>
					</div>
					<Button
						variable='primary'
						type='submit'
						isDisabled={isLoading}
						className='w-full'
					>
						{isLoading ? 'Проверяем...' : 'Подтвердить код'}
					</Button>
				</form>
			</div>
		</div>
	)
}
