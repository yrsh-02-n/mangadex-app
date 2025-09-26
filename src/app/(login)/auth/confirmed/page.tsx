'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { Heading } from '@/components/ui/heading/Heading'

import { createClient } from '@/utils/supabase/client'

export default function ConfirmedPage() {
	const router = useRouter()
	const supabase = createClient()

	useEffect(() => {
		const checkAndSignOut = async () => {
			const { data } = await supabase.auth.getSession()

			if (data.session) {
				await supabase.auth.signOut()

				toast.success('Email подтверждён! Теперь вы можете войти.')
			} else {
				toast.success('Email подтверждён!')
			}

			router.push('/auth')
		}

		checkAndSignOut()
	}, [router, supabase])

	return (
		<div className='flex justify-center items-center h-screen p-[1.5rem]'>
			<div className='flex flex-col bg-primary items-center rounded p-[1.5rem] max-w-[30rem] min-w-[300px]'>
				<div className='text-center'>
					<Heading
						isH1
						className='mb-[.5rem]'
					>
						Email подтверждён! Теперь вы можете войти.
					</Heading>
					<p className='max-xs:text-xs'></p>
				</div>
			</div>
		</div>
	)
}
