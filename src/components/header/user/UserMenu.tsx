'use client'

import { BookMarked, LogOut, Settings } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

import { SkeletonLoader } from '@/components/ui/skeletonLoader/SkeletonLoader'

import { useClickOutside } from '@/hooks/useClickOutside'
import { useUserProfile } from '@/hooks/useUserProfile'

import { handleLogout } from '@/app/(login)/auth/authForm/auth.handlers'

export function UserMenu() {
	const { data: profile, isLoading } = useUserProfile()
	const [isOpen, setIsOpen] = useState(false)
	const buttonRef = useRef<HTMLButtonElement>(null)
	const router = useRouter()

	const dropdownRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false), [isOpen], buttonRef)

	const avatarUrl = profile?.avatar_url ? profile.avatar_url : '/user/avatar-placeholder.png'

	const menuItems = [
		{ href: '/library', icon: BookMarked, label: 'Моя библиотека' },
		{ href: '/settings', icon: Settings, label: 'Настройки' }
	]

	const handleLogoutClick = () => {
		handleLogout(router)
		setIsOpen(false)
	}

	return (
		<div className='relative'>
			<button
				ref={buttonRef}
				onClick={() => setIsOpen(!isOpen)}
				className='focus:outline-none focus:ring-2 focus:ring-accent rounded-full'
			>
				<div className='relative w-[32px] h-[32px]'>
					{isLoading ? (
						<SkeletonLoader
							count={1}
							className='w-[32px] h-[32px] rounded-full bg-stone-700 flex-shrink-0'
						/>
					) : (
						<Image
							src={avatarUrl}
							fill
							sizes='32'
							alt='Ваш аккаунт'
							className='object-cover shrink-0 rounded-full'
							unoptimized
						/>
					)}
				</div>
			</button>

			{isOpen && (
				<div
					ref={dropdownRef}
					className='absolute right-0 mt-2 w-56 bg-primary rounded-lg shadow-lg border border-stone-700 py-2 z-50'
				>
					{menuItems.map(item => (
						<Link
							key={item.href}
							href={item.href}
							onClick={() => setIsOpen(false)}
							className='flex items-center gap-3 px-4 py-2.5 text-white hover:bg-bg/20 hover:text-accent transition-colors duration-200'
						>
							<item.icon
								size={20}
								className='shrink-0'
							/>
							<span className='text-base'>{item.label}</span>
						</Link>
					))}

					<div className='border-t border-stone-700 my-2' />

					<button
						onClick={handleLogoutClick}
						className='flex items-center gap-3 px-4 py-2.5 text-white hover:bg-bg/20 hover:text-accent transition-colors duration-200 w-full text-left'
					>
						<LogOut
							size={20}
							className='shrink-0'
						/>
						<span className='text-base'>Выход</span>
					</button>
				</div>
			)}
		</div>
	)
}
