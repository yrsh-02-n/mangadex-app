import cn from 'clsx'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { useSidebarStore } from '@/store/ui.store'

import { logout } from '@/utils/supabase/client'

export function LogoutMenuItem() {
	const { isSidebarOpen, toggleSidebar } = useSidebarStore()
	const router = useRouter()

	const handleLogout = async () => {
		const { error } = await logout()
		if (!error) {
			router.push('/')
		}
	}

	return (
		<li>
			<button
				title='Выход'
				className='flex gap-[.8rem] items-center group text-nowrap text-white'
				onClick={handleLogout}
			>
				<LogOut
					size={24}
					className='group-hover:text-accent transition-colors duration-200 shrink-0'
				/>
				<span
					className={cn(
						'hover:text-accent group-hover:text-accent text-lg transition-all duration-200',
						!isSidebarOpen && 'hidden opacity-0'
					)}
				>
					Выход
				</span>
			</button>
		</li>
	)
}
