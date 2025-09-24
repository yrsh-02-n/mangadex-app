import { useEffect } from 'react'
interface Props {
	hasNextPage: boolean
	isFetchingNextPage: boolean
	fetchNextPage: () => void
	scrollElementRef?: React.RefObject<HTMLElement | null>
}
export function useEffectScroll({
	fetchNextPage,
	hasNextPage,
	isFetchingNextPage,
	scrollElementRef
}: Props) {
	useEffect(() => {
		const handleScroll = () => {
			// if ref exists
			if (scrollElementRef?.current) {
				const { scrollTop, scrollHeight, clientHeight } = scrollElementRef.current
				if (scrollTop + clientHeight >= scrollHeight * 0.99 && hasNextPage && !isFetchingNextPage) {
					fetchNextPage()
				}
				return
			}
			// if ref not exists use window as default
			if (
				window.innerHeight + document.documentElement.scrollTop >=
					document.documentElement.offsetHeight * 0.99 &&
				hasNextPage &&
				!isFetchingNextPage
			) {
				fetchNextPage()
			}
		}
		// get element as ref
		const scrollElement = scrollElementRef?.current || window
		scrollElement.addEventListener('scroll', handleScroll)
		return () => scrollElement.removeEventListener('scroll', handleScroll)
	}, [hasNextPage, isFetchingNextPage, fetchNextPage, scrollElementRef])
}
