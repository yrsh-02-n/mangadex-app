import Image from 'next/image'

import { AuthForm } from './authForm/AuthForm'

export default function AuthPage() {
	return (
	<div className='grid grid-cols-[600px_1fr] min-h-screen'>
  <div className='relative w-full' style={{ height: '100vh' }}>
    <Image
      fill
      alt='Страница авторизации'
      src={'/auth-img.jpg'}
      quality={50}
      className='object-cover'
      sizes="600px"
      priority
    />
  </div>
  <div className='flex items-center justify-cente'>
    <div className='w-full max-w-md p-8'>
      <AuthForm />
    </div>
  </div>
</div>
	)
}
