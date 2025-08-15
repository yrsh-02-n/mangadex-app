import { ReactNode } from 'react'

interface IHeadingProps {
	isH1: boolean
	children: ReactNode
	className?: string
}

// TODO: add back button

export function Heading({ isH1, children }: IHeadingProps) {
	return isH1 ? <h1 className='text-2xl font-semibold mb-[2rem] max-md:text-xl'>{children}</h1> : <h2 className='text-xl font-semibold mb-[2rem] max-md:text-lg'>{children}</h2>
}
