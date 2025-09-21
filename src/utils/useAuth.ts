'use client'

import { useEffect, useState } from 'react'

import { createClient } from '@/utils/supabase/client'

export function useAuth() {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const supabase = createClient()

		// check current user
		supabase.auth.getUser().then(({ data }) => {
			setIsAuthenticated(!!data.user)
			setLoading(false)
		})

		// listen changes at auth session
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setIsAuthenticated(!!session?.user)
			setLoading(false)
		})

		return () => subscription.unsubscribe()
	}, [])

	return { isAuthenticated, loading }
}
