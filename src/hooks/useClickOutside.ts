import { useEffect, useRef } from 'react'

// Теперь хук может принимать опциональный buttonRef
export const useClickOutside = <T extends HTMLElement = HTMLElement>(
	handler: () => void,
	deps: React.DependencyList = [],
	buttonRef?: React.RefObject<HTMLElement | null> // опциональный параметр
) => {
	const dropdownRef = useRef<T>(null)

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node) &&
				buttonRef?.current &&
				!buttonRef.current.contains(event.target as Node)
			) {
				handler()
			}
		}

		document.addEventListener('mousedown', handleClick)

		return () => {
			document.removeEventListener('mousedown', handleClick)
		}
	}, [buttonRef, handler, ...deps])

	return dropdownRef
}
