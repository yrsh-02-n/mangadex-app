import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { toast } from 'react-hot-toast'

import { createClient, logout } from '@/utils/supabase/client'

const supabase = createClient()

export const handleSignup = async (data: any, router: AppRouterInstance) => {
	const { data: signUpData, error } = await supabase.auth.signUp({
		email: data.email,
		password: data.password,
		options: {
			data: {
				display_name: data.name || ''
			}
		}
	})

	if (error) {
		toast.error(error.message)
		return
	}

	if (signUpData.user) {
		toast.success('Регистрация успешна!')
		setTimeout(() => {
			router.push('/')
		}, 2000)
	} else {
		toast.success('Проверьте вашу почту для подтверждения регистрации.')
	}
}

export const handleLogin = async (data: any, router: AppRouterInstance) => {
	try {
		const { data: loginData, error } = await supabase.auth.signInWithPassword({
			email: data.email,
			password: data.password
		})

		if (error) {
			if (error.message.includes('Invalid login credentials')) {
				toast.error('Неверный email или пароль')
			} else if (error.message.includes('User not found')) {
				toast.error('Пользователя с таким email не существует')
			} else {
				toast.error(error.message)
			}
			return
		}

		toast.success('Добро пожаловать, username!')
		router.push('/')
	} catch (error: any) {
		toast.error(error.message)
	}
}

export const handleLogout = async (router: AppRouterInstance) => {
	const { error } = await logout()
	toast.success('Вы вышли из аккаунта.')
	if (!error) {
		router.push('/')
	}
}
