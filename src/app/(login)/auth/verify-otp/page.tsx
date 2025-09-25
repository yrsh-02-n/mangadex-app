import { Suspense } from 'react'

import VerifyOTPClient from './VerifyOTPClient'

export default function PasswordOTPVerificationPage() {
	return (
		<Suspense fallback={<div>Загрузка...</div>}>
			<VerifyOTPClient />
		</Suspense>
	)
}
