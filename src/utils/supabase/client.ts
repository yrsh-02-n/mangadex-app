import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
	return createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
	)
}

export async function logout() {
	const supabase = createClient()
	const { error } = await supabase.auth.signOut()
	return { error }
}
