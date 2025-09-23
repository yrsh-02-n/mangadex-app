import { z } from 'zod'

export const registerSchema = z.object({
	email: z.string().email({ message: 'Неверный формат email' }),
	password: z.string().min(6, { message: 'Пароль должен быть минимум 6 символов' }),
	name: z.string().min(3, { message: 'Имя должно содержать минимум 3 символа' })
})

export const loginSchema = z.object({
	email: z.string().email({ message: 'Неверный формат email' }),
	password: z.string().min(6, { message: 'Пароль должен быть минимум 6 символов' })
})

export type RegisterFormData = z.infer<typeof registerSchema>
export type LoginFormData = z.infer<typeof loginSchema>
