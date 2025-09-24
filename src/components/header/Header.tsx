'use client'

import cn from 'clsx'
import { useEffect, useState } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { Button } from '../ui/button/Button'
import { SearchField } from '../ui/fields/searchField/SearchField'

import { UserMenu } from './user/UserMenu'

export function Header() {
	const [isScrolled, setIsScrolled] = useState(false)
	const { isAuthenticated } = useAuth()

	useEffect(() => {
		const scrollContainer = document.getElementById('main-scroll-container')

		const handleScroll = () => {
			const scrollTop = scrollContainer ? scrollContainer.scrollTop : window.scrollY
			setIsScrolled(scrollTop > 10)
		}

		const target = scrollContainer || window
		target.addEventListener('scroll', handleScroll)

		return () => target.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<header
			className={cn(
				'absolute z-998 top-0 left-0 right-0 flex justify-between items-center gap-[2rem] p-[1.5rem] h-[5rem] transition-all duration-300',
				isScrolled ? 'bg-bg/80 backdrop-blur-md' : 'bg-transparent'
			)}
		>
			<SearchField />
			{isAuthenticated ? (
				<UserMenu />
			) : (
				<Button
					variable='primary'
					className='h-full'
					isLink
					link='/auth'
				>
					Войти
				</Button>
			)}
		</header>
	)
}
