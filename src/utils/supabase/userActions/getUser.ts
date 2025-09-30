import { redirect } from 'next/navigation'

import { createClient } from '../server'

export const getUser = async () => {
	const supabase = await createClient()
	const {
		data: { user },
		error
	} = await supabase.auth.getUser()

	if (error || !user) {
		redirect('/auth')
	}

	return user
}
