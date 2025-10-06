import { useEffect, useRef } from 'react'

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
	buttonRef: React.RefObject<HTMLElement | null>,
	handler: () => void,
	deps: React.DependencyList = []
) => {
	const dropdownRef = useRef<T>(null)

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node) &&
				buttonRef.current &&
				!buttonRef.current.contains(event.target as Node)
			) {
				handler()
			}
		}

		document.addEventListener('mousedown', handleClick)

		return () => {
			document.removeEventListener('mousedown', handleClick)
		}
	}, deps)

	return dropdownRef
}
