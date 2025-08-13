import Image from 'next/image'

export function UserMenu() {
  // sign out, settings, library
	return (
		<button>
			<Image
				src={'/user/avatar-placeholder.png'}
				width={32}
				height={32}
				alt='Ваш аккаунт'
        className='shrink-0 rounded-full'
			/>
		</button>
	)
}
