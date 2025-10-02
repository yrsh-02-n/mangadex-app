import { zodResolver } from '@hookform/resolvers/zod'
import cn from 'clsx'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button/Button'
import { DefaultField } from '@/components/ui/fields/DefaultField'

import { useUpdateUsername } from '@/hooks/user-data/useUpdateUsername'

import { updateUsernameSchema } from '@/app/schemas/settings.schemas'
import { AuthFormData } from '@/types/user-types/auth.types'

type UsernameFormData = Required<Pick<AuthFormData, 'name'>>

interface Props {
	isShow?: boolean
	classname?: string
	onSuccess?: () => void
}

export const UpdateNameForm = ({ isShow, classname, onSuccess }: Props) => {
	const [username, setUsername] = useState<string>('')
	const updateUsernameMutation = useUpdateUsername()
	const { control, handleSubmit } = useForm<UsernameFormData>({
		resolver: zodResolver(updateUsernameSchema),
		defaultValues: {
			name: ''
		}
	})
	const useUpdateUsernameHandler = () => {
		if (username === '') return
		updateUsernameMutation.mutate(username, {
			onSuccess: () => {
				onSuccess?.()
				setUsername('')
			}
		})
	}

	return (
		<form
			onSubmit={handleSubmit(useUpdateUsernameHandler)}
			className={cn('relative', isShow ? '' : 'hidden')}
		>
			<Controller
				name='name'
				control={control}
				rules={{ required: true }}
				render={({ field, fieldState }) => (
					<DefaultField
						id='name'
						type='text'
						placeholder='Введите новый никнейм'
						className='w-full bg-bg'
						size='sm'
						variant='default'
						error={fieldState.error?.message}
						{...field}
						onChange={e => {
							;(field.onChange(e), setUsername(e.target.value))
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
