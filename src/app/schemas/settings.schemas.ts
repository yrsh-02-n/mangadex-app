import { z } from 'zod'

export const updateUsernameSchema = z.object({
	name: z.string().min(3, { message: 'Имя должно содержать минимум 3 символа' })
})

export const updateEmailSchema = z.object({
	email: z.string().email({ message: 'Неверный формат email' })
})

export type updateUsernameData = z.infer<typeof updateUsernameSchema>
export type updateEmailData = z.infer<typeof updateEmailSchema>
