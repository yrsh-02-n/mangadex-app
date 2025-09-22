import Image from 'next/image'
import Link from 'next/link'

interface ILogoProps {
	isSidebarOpen?: boolean
}

export function Logo({ isSidebarOpen }: ILogoProps) {
	return (
		<Link
			href='/'
			className='h-fit'
		>
			<Image
				src={isSidebarOpen ? '/logo/logo-full.svg' : '/logo/logo-short.svg'}
				width={isSidebarOpen ? 220 : 32}
				height={isSidebarOpen ? 120 : 32}
				alt='Логотип сайта'
			/>
		</Link>
	)
}
