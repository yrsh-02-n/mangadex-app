import { useUser } from '@supabase/auth-helpers-react'

export function AuthForm() {
	const { user, isLoading } = useUser()

	return <form>AuthForm</form>
}
