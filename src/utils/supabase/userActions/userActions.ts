'use client'

import { createClient } from '../client'

const supabase = createClient()

export async function recoveryPassword(email: string) {
	if (typeof email !== 'string') {
		throw new Error('Email должен быть строкой')
	}

	const redirectTo = `${window.location.origin}/auth/callback` // url for redirect

	const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo
	})

	if (error) {
		console.error('Supabase recovery error:', error)
		throw error
	}

	console.log('Recovery email request sent (or silently failed if email not found):', data)
	return data
}

export async function resetPassword(newPassword: string) {
	const { data, error } = await supabase.auth.updateUser({ password: newPassword })

	if (error) {
		console.error('Supabase reset password error:', error)
		throw error
	}

	console.log('Reset password feature is not working', data)
	return data
}
