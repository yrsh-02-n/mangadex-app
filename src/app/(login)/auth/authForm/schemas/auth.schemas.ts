import { z } from 'zod'

export const registerSchema = z
	.object({
		email: z.string().email({ message: 'Неверный формат email' }),
		password: z.string().min(6, { message: 'Пароль должен быть минимум 6 символов' }),
		name: z.string().min(3, { message: 'Имя должно содержать минимум 3 символа' }),
		confirmPassword: z.string().min(6, { message: 'Пароль должен быть минимум 6 символов' })
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword']
	})

export const loginSchema = z.object({
	email: z.string().email({ message: 'Неверный формат email' }),
	password: z.string().min(6, { message: 'Пароль должен быть минимум 6 символов' })
})

export const recoverySchema = z.object({
	email: z.string().email({ message: 'Неверный формат email' })
})

export const resetPasswordSchema = z
	.object({
		password: z.string().min(6, { message: 'Пароль должен быть минимум 6 символов' }),
		confirmPassword: z.string().min(6, { message: 'Пароль должен быть минимум 6 символов' })
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword']
	})

export const otpVerificationSchema = z.object({
	otp: z
		.string()
		.min(6, 'Код должен содержать 6 символов')
		.max(6, 'Код должен содержать 6 символов')
})

export type RegisterFormData = z.infer<typeof registerSchema>
export type LoginFormData = z.infer<typeof loginSchema>
export type RecoveryFormData = z.infer<typeof recoverySchema>
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>
export type otpVerificationData = z.infer<typeof otpVerificationSchema>
