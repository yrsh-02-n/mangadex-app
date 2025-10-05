'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { ListingContainer } from '@/components/listingContainer/ListingContainer'
import { Heading } from '@/components/ui/heading/Heading'
import { Tab } from '@/components/ui/tab/Tab'

import { useSearchQuery } from '@/hooks/useSearchQuery'

import { useAuth } from '@/utils/supabase/userActions/useAuth'

import { LibrarySection } from './librarySection/LibrarySection'

export default function UserLibraryPage() {
	const router = useRouter()
	const { isAuthenticated, loading } = useAuth()
	const [currentSection, setCurrentSection] = useState<
		'reading' | 'planned' | 'completed' | 'paused' | 'dropped'
	>('reading')

	useEffect(() => {
		if (!loading && !isAuthenticated) {
			router.push('/auth')
		}
	}, [isAuthenticated, loading, router])

	// for test
	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, isError } =
		useSearchQuery()

	const allTitles = data?.pages.flatMap(page => page.data) || []

	let sectionNumber = 0

	switch (currentSection) {
		case 'reading':
			sectionNumber = 1
			break
		case 'planned':
			sectionNumber = 2
			break
		case 'completed':
			sectionNumber = 3
			break
		case 'paused':
			sectionNumber = 4
			break
		case 'dropped':
			sectionNumber = 5
			break
		default:
			sectionNumber = 1
			break
	}

	return (
		<section className='px-[1.5rem] mt-[6rem] pb-[2rem]'>
			<div className='w-full'>
				<Heading isH1>Ваша библиотека</Heading>
			</div>
			<div className='flex flex-col gap-[1.5rem] bg-primary rounded p-[1.5rem]'>
				<div className='flex'>
					<Tab
						name='Читаю'
						isActive={currentSection === 'reading'}
						onClick={() => setCurrentSection('reading')}
					/>
					<Tab
						name='В планах'
						isActive={currentSection === 'planned'}
						onClick={() => setCurrentSection('planned')}
					/>
					<Tab
						name='Прочитано'
						isActive={currentSection === 'completed'}
						onClick={() => setCurrentSection('completed')}
					/>
					<Tab
						name='Отложено'
						isActive={currentSection === 'paused'}
						onClick={() => setCurrentSection('paused')}
					/>
					<Tab
						name='Брошено'
						isActive={currentSection === 'dropped'}
						onClick={() => setCurrentSection('dropped')}
					/>
				</div>
				<div>
					section {sectionNumber}
					<LibrarySection
						isLoading={isLoading}
						isError={isError}
						titles={allTitles}
					/>
				</div>
			</div>
		</section>
	)
}
