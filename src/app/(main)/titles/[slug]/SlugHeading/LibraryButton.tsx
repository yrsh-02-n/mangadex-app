import { ChevronDown } from 'lucide-react'
import { useRef, useState } from 'react'

import { SelectLibrarySection } from '@/components/selectLibrarySection/SelectLibrarySection'
import { Button } from '@/components/ui/button/Button'

import { useClickOutside } from '@/hooks/useClickOutside'

export const LibraryButton = () => {
	const [isShow, setIsShow] = useState<boolean>(false)
	const buttonRef = useRef<HTMLButtonElement>(null)
	const dropdownRef = useClickOutside<HTMLDivElement>(() => setIsShow(false), [isShow], buttonRef)

	const toggleIsShow = () => {
		setIsShow(prev => !prev)
	}

	return (
		<div className='relative w-fit'>
			<Button
				ref={buttonRef}
				variable='primary'
				className='px-[1rem]'
				onClick={toggleIsShow}
			>
				Добавить в библиотеку
				<ChevronDown />
			</Button>
			<div ref={dropdownRef}>
				<SelectLibrarySection isShow={isShow} />
			</div>
		</div>
	)
}
