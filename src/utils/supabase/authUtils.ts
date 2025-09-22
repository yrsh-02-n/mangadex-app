import { useRouter } from 'next/navigation'

import { createClient } from './client'
import { AuthFormData } from '@/types/auth.types'

const supabase = createClient()

// register handler
export const onSubmitSignup = async (data: AuthFormData) => {
	console.log('Signup data:', data)

	try {
		const { data: signUpData, error } = await supabase.auth.signUp({
			email: data.email,
			password: data.password,
			options: {
				data: {
					name: data.name,
					redirectTo: `${window.location.origin}/`
				}
			}
		})

		if (error) {
			console.error('Ошибка регистрации Supabase:', error)
			// TODO: Обработать ошибку юзеру
		} else {
			console.log('Регистрация успешна:', signUpData)

			if (signUpData.user) {
				console.log('Пользователь создан:', signUpData.user)
				// TODO: Возможно, перенаправить или показать сообщение
			} else {
				// Требуется подтверждение email
				alert('Проверьте вашу почту для подтверждения регистрации.')
			}
		}
	} catch (err) {
		console.error('Непредвиденная ошибка:', err)
		// TODO: Обработать неожиданную ошибку
	}
}

// login handler
export const onSubmitLogin = async (data: AuthFormData) => {
	console.log('Login data:', data)

	try {
		const { data: loginData, error } = await supabase.auth.signInWithPassword({
			email: data.email,
			password: data.password
		})

		if (error) {
			console.error('Ошибка входа Supabase:', error)
			// TODO: Обработать ошибку для юзера
		} else {
			console.log('Вход успешен:', loginData)
		}
	} catch (err) {
		console.error('Непредвиденная ошибка:', err)
		// TODO: Обработать неожиданную ошибку
	}
}
