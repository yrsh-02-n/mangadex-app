import { zodResolver } from '@hookform/resolvers/zod'
import cn from 'clsx'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button/Button'
import { DefaultField } from '@/components/ui/fields/DefaultField'

import { useUpdatePassword } from '@/hooks/user-data/useUpdatePassword'

import { resetPasswordSchema } from '@/app/schemas/auth.schemas'
import { AuthFormData } from '@/types/user-types/auth.types'

type PasswordFormData = Required<Pick<AuthFormData, 'password' | 'confirmPassword'>>

interface Props {
	isShow?: boolean
	classname?: string
	onSuccess?: () => void
}

export const UpdatePasswordForm = ({ isShow, classname, onSuccess }: Props) => {
	const [password, setPassword] = useState<string>('')
	const [confirmedPassword, setConfirmedPassword] = useState<string>('')
	const updatePasswordMutation = useUpdatePassword()
	const { control, handleSubmit } = useForm<PasswordFormData>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: '',
			confirmPassword: ''
		}
	})
	const useUpdatePasswordHandler = () => {
		if (password === '' || confirmedPassword === '') return
		updatePasswordMutation.mutate(password, {
			onSuccess: () => {
				onSuccess?.()
				setPassword('')
				setConfirmedPassword('')
			}
		})
	}

	return (
		<form
			onSubmit={handleSubmit(useUpdatePasswordHandler)}
			className={cn(isShow ? 'max-md:w-full' : 'hidden')}
		>
			<div className='flex gap-[1rem] w-full max-lg:flex-col max-lg:gap-[1rem]'>
				<div className='w-[300px] max-md:w-full'>
					<Controller
						name='password'
						control={control}
						rules={{ required: true }}
						render={({ field, fieldState }) => (
							<DefaultField
								id='password'
								type='password'
								placeholder='Введите новый пароль'
								className='w-full bg-bg'
								size='sm'
								variant='default'
								error={fieldState.error?.message}
								{...field}
								onChange={e => {
									;(field.onChange(e), setPassword(e.target.value))
								}}
							/>
						)}
					/>
				</div>
				<div className='w-[300px] max-md:w-full'>
					<Controller
						name='confirmPassword'
						control={control}
						rules={{ required: true }}
						render={({ field, fieldState }) => (
							<DefaultField
								id='confirmedPassword'
								type='password'
								placeholder='Подтвердите пароль'
								className='w-full bg-bg'
								size='sm'
								variant='default'
								error={fieldState.error?.message}
								{...field}
								onChange={e => {
									;(field.onChange(e), setConfirmedPassword(e.target.value))
								}}
							/>
						)}
					/>
				</div>
				<Button
					variable='primary'
					className='h-[2rem] w-[200px] max-lg:w-[300px] max-md:w-full'
				>
					Сменить пароль
				</Button>
			</div>
		</form>
	)
}
