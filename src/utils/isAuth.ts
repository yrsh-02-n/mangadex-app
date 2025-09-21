'useClient'

import { useUser } from '@supabase/auth-helpers-react'

export function useAuth() {
	const userResult = useUser()
	const user = userResult !== null ? userResult : null
	const isUserLoggedIn = !!user
	return isUserLoggedIn
}
