import { z } from 'zod'

export const updateUsernameSchema = z.object({
	name: z.string().min(3, { message: 'Имя должно содержать минимум 3 символа' })
})

export type updateUsernameData = z.infer<typeof updateUsernameSchema>
