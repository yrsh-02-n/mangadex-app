import { useQuery } from '@tanstack/react-query'
import cn from 'clsx'
import { ChevronDown, LucideCheckCheck } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { SelectLibrarySection } from '@/components/selectLibrarySection/SelectLibrarySection'
import { Button } from '@/components/ui/button/Button'

import { useClickOutside } from '@/hooks/useClickOutside'

import { addMangaToLibrary, getUserLibraryEntry } from '@/utils/supabase/mangaActions/mangaActions'

export const LibraryButton = ({ mangaId }: { mangaId: string }) => {
	const {
		data: currentStatus, // ✅ data — это currentStatus
		isLoading: isStatusLoading,
		isError
	} = useQuery({
		queryKey: ['libraryStatus', mangaId],
		queryFn: () => getUserLibraryEntry(mangaId),
		retry: false,
		enabled: !!mangaId
	})

	const [selectedStatus, setSelectedStatus] = useState<string>('')

	useEffect(() => {
		if (currentStatus !== undefined) {
			setSelectedStatus(currentStatus || '')
		}
	}, [currentStatus])

	const [isShow, setIsShow] = useState<boolean>(false)
	const buttonRef = useRef<HTMLButtonElement>(null)
	const dropdownRef = useClickOutside<HTMLDivElement>(() => setIsShow(false), [isShow], buttonRef)

	const toggleIsShow = () => {
		setIsShow(prev => !prev)
	}

	const handleStatusChange = (value: string) => {
		if (!mangaId) {
			console.error('mangaId отсутствует в URL')
			return
		}

		if (value) {
			addMangaToLibrary({
				section: value,
				mangaId: mangaId.toString()
			})
		}
		setSelectedStatus(value)
	}

	const isInLibrary = !!selectedStatus

	if (isStatusLoading) {
		return (
			<Button
				variable='primary'
				className='px-[1rem] w-[18rem]'
			>
				Загрузка...
			</Button>
		)
	}

	if (isError) {
		return (
			<Button
				variable='primary'
				className='px-[1rem] w-[18rem]'
			>
				Ошибка
			</Button>
		)
	}

	return (
		<div className='relative w-fit'>
			<Button
				ref={buttonRef}
				variable='primary'
				className='px-[1rem] w-[18rem]'
				onClick={toggleIsShow}
			>
				{isInLibrary ? 'Добавлено в библиотеку' : 'Добавить в библиотеку'}
				{isInLibrary ? (
					<LucideCheckCheck size={18} />
				) : (
					<ChevronDown
						className={cn('transition-transform duration-200', isShow && 'rotate-180')}
					/>
				)}
			</Button>
			<div ref={dropdownRef}>
				<SelectLibrarySection
					isShow={isShow}
					selectedStatus={selectedStatus}
					onChange={handleStatusChange}
				/>
			</div>
		</div>
	)
}
