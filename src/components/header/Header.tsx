'use client'

import cn from 'clsx'
import { RefObject, useEffect, useState } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { Button } from '../ui/button/Button'
import { SearchField } from '../ui/fields/searchField/SearchField'

import { UserMenu } from './user/UserMenu'

interface HeaderProps {
	scrollRef?: RefObject<HTMLDivElement | null>
}

export function Header({ scrollRef }: HeaderProps) {
	const [isScrolled, setIsScrolled] = useState(false)
	const { isAuthenticated } = useAuth()

	useEffect(() => {
		if (!scrollRef || !scrollRef.current) {
			return
		}

		const scrollElement = scrollRef.current

		const handleScroll = () => {
			setIsScrolled(scrollElement.scrollTop > 10)
		}

		scrollElement.addEventListener('scroll', handleScroll, { passive: true })
		handleScroll()
		return () => {
			scrollElement.removeEventListener('scroll', handleScroll)
		}
	}, [scrollRef])

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
