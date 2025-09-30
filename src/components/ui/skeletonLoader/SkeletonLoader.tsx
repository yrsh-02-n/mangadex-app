import { twMerge } from 'tailwind-merge'

interface Props {
	count?: number
	className?: string
}

export function SkeletonLoader({ count = 1, className = ''}: Props) {
	return (
		<>
			{Array.from({ length: count }).map((_, index) => (
				<div
					key={index}
					className={twMerge('bg-primary rounded-sm h-10 animate-pulse', className)}
				/>
			))}
		</>
	)
}
