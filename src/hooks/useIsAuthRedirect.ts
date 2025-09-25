import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useAuth } from '../utils/supabase/userActions/useAuth'

export const useIsAuthRedirect = () => {
	const { isAuthenticated } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (isAuthenticated) {
			router.push('/')
		}
	}, [isAuthenticated, router])
}
