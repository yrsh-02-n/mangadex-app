import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { toast } from 'react-hot-toast'

import { createClient, logout } from '@/utils/supabase/client'

const supabase = createClient()

export const handleSignup = async (data: any, router: AppRouterInstance) => {
	const { data: signUpData, error } = await supabase.auth.signUp({
		email: data.email,
		password: data.password,
		options: {
			emailRedirectTo: `${window.location.origin}/auth/confirmed`,
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
			router.push('auth/success')
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

		if (loginData.user) {
			// ✅ Проверь, есть ли профиль
			const { data: profile, error: profileError } = await supabase
				.from('profiles')
				.select('id')
				.eq('id', loginData.user.id)
				.single()

			if (profileError && profileError.code === 'PGRST116') {
				const { error: createError } = await supabase.from('profiles').insert({
					id: loginData.user.id,
					username:
						loginData.user.user_metadata?.display_name ||
						loginData.user.email?.split('@')[0] ||
						'user',
					avatar_url: null
				})

				if (createError) {
					console.error('Ошибка при создании профиля:', createError.message)
					toast.error('Ошибка при создании профиля.')
					return
				}
			}
		}

		toast.success(`Добро пожаловать!`)
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
