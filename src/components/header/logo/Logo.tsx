import Image from 'next/image'
import Link from 'next/link'

export function Logo() {
	return (
		<Link href='#'>
			<Image
				src={'logo/logo-full.svg'}
				width={220}
				height={120}
				alt='Логотип сайта'
			/>
		</Link>
	)
}
