import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

interface ArrowBtnProps {
	link: string
	className?: string
}

export function ArrowButton({ link, className }: ArrowBtnProps) {
	return (
		<Link href={link}>
			<button
				className={twMerge(
					' text-white p-[.3rem] mt-[.3rem] rounded-full hover:bg-accent transition-colors duration-200',
					className
				)}
			>
				<ArrowRight size={24} />
			</button>
		</Link>
	)
}
