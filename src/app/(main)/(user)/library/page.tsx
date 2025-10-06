'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Heading } from '@/components/ui/heading/Heading'
import { Tab } from '@/components/ui/tab/Tab'

import { useAuth } from '@/utils/supabase/userActions/useAuth'
import { useUserLibrary } from '@/utils/supabase/userActions/useUserLibrary'

import { LibrarySection } from './librarySection/LibrarySection'
import { ReadingStatus } from '@/types/enums'
import { IUserLibrary } from '@/types/user-types/library.types'

export default function UserLibraryPage() {
	const router = useRouter()
	const { isAuthenticated, loading } = useAuth()
	const [currentSection, setCurrentSection] = useState<IUserLibrary['section']>(
		ReadingStatus.READING
	)

	useEffect(() => {
		if (!loading && !isAuthenticated) {
			router.push('/auth')
		}
	}, [isAuthenticated, loading, router])

	const { data: library, isLoading, isError } = useUserLibrary()

	useEffect(() => {
		if (library) {
			console.log(library)
		}
	}, [library])

	let sectionNumber = 0

	switch (currentSection) {
		case ReadingStatus.READING:
			sectionNumber = 1
			break
		case ReadingStatus.PLANNED:
			sectionNumber = 2
			break
		case ReadingStatus.COMPLETED:
			sectionNumber = 3
			break
		case ReadingStatus.PAUSED:
			sectionNumber = 4
			break
		case ReadingStatus.DROPPED:
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
						isActive={currentSection === ReadingStatus.READING}
						onClick={() => setCurrentSection(ReadingStatus.READING)}
					/>
					<Tab
						name='В планах'
						isActive={currentSection === ReadingStatus.PLANNED}
						onClick={() => setCurrentSection(ReadingStatus.PLANNED)}
					/>
					<Tab
						name='Прочитано'
						isActive={currentSection === ReadingStatus.COMPLETED}
						onClick={() => setCurrentSection(ReadingStatus.COMPLETED)}
					/>
					<Tab
						name='Отложено'
						isActive={currentSection === ReadingStatus.PAUSED}
						onClick={() => setCurrentSection(ReadingStatus.PAUSED)}
					/>
					<Tab
						name='Брошено'
						isActive={currentSection === ReadingStatus.DROPPED}
						onClick={() => setCurrentSection(ReadingStatus.DROPPED)}
					/>
				</div>
				<div>
					section {sectionNumber}
					<LibrarySection
						isLoading={isLoading}
						isError={isError}
						titles={library?.[currentSection] || []}
					/>
				</div>
			</div>
		</section>
	)
}
