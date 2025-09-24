import { useCallback, useEffect, useRef } from 'react'

interface Props {
	hasNextPage: boolean
	isFetchingNextPage: boolean
	fetchNextPage: () => void
	scrollElementRef?: React.RefObject<HTMLElement | null>
}

export function useInfiniteScroll({
	fetchNextPage,
	hasNextPage,
	isFetchingNextPage,
	scrollElementRef
}: Props) {
	const observer = useRef<IntersectionObserver | null>(null)
	const sentinelRef = useRef<HTMLDivElement>(null)

	// Используем useCallback для стабильной функции
	const loadMore = useCallback(() => {
		if (hasNextPage && !isFetchingNextPage) {
			fetchNextPage()
		}
	}, [hasNextPage, isFetchingNextPage, fetchNextPage])

	useEffect(() => {
		const sentinel = sentinelRef.current
		if (!sentinel) return

		observer.current = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
					loadMore()
				}
			},
			{
				root: scrollElementRef?.current || null,
				threshold: 0.1
			}
		)

		observer.current.observe(sentinel)

		return () => {
			if (observer.current) {
				observer.current.disconnect()
			}
		}
	}, [loadMore, hasNextPage, isFetchingNextPage, scrollElementRef])

	return sentinelRef
}
