import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'

import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url)
	const token_hash = searchParams.get('token_hash')
	const type = searchParams.get('type') as EmailOtpType | null
	const next = searchParams.get('next') ?? '/'

	if (token_hash && type) {
		const supabase = await createClient() // server client

		const { error } = await supabase.auth.verifyOtp({
			type,
			token_hash
		})
		if (!error) {
			// succes verify (signup, recovery, invite)
			// recovery type - redirect to reset page
			if (type === 'recovery') {
				return NextResponse.redirect(new URL('/auth/reset-password', request.url))
			}

			// signup, invite and other types
			return NextResponse.redirect(new URL(next, request.url))
		}
	}

	// invalid token or type
	return NextResponse.redirect(new URL('/auth?error=verification_failed', request.url))
}


