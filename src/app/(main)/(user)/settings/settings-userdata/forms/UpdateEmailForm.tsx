import { zodResolver } from '@hookform/resolvers/zod'
import cn from 'clsx'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button/Button'
import { DefaultField } from '@/components/ui/fields/DefaultField'

import { useUpdateEmail } from '@/hooks/user-data/useUpdateEmail'

import { updateEmailSchema } from '@/app/schemas/settings.schemas'
import { AuthFormData } from '@/types/user-types/auth.types'

type EmailFormData = Pick<AuthFormData, 'email'>

interface Props {
	isShow?: boolean
	classname?: string
	onSuccess?: () => void
}

export const UpdateEmailForm = ({ isShow, classname, onSuccess }: Props) => {
	const [email, setEmail] = useState<string>('')
	const updateEmailMutation = useUpdateEmail()
	const { control, handleSubmit } = useForm<EmailFormData>({
		resolver: zodResolver(updateEmailSchema),
		defaultValues: {
			email: ''
		}
	})
	const useUpdateEmailHandler = () => {
		if (email === '') return
		updateEmailMutation.mutate(email, {
			onSuccess: () => {
				onSuccess?.()
				setEmail('')
			}
		})
	}

	return (
		<form
			onSubmit={handleSubmit(useUpdateEmailHandler)}
			className={cn('relative', isShow ? '' : 'hidden')}
		>
			<Controller
				name='email'
				control={control}
				rules={{ required: true }}
				render={({ field, fieldState }) => (
					<DefaultField
						id='email'
						type='text'
						placeholder='Введите новый email'
						className='w-full bg-bg'
						size='sm'
						variant='default'
						error={fieldState.error?.message}
						{...field}
						onChange={e => {
							;(field.onChange(e), setEmail(e.target.value))
						}}
					/>
				)}
			/>
			<Button
				variable='primary'
				className='absolute h-[2rem] w-[2rem] top-0 right-0 p-0 rounded-l-none'
			>
				<ArrowRight size={20} />
			</Button>
		</form>
	)
}
