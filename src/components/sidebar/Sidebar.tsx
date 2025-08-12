import { Logo } from '../header/logo/Logo'

import { SidebarMenu } from './nav/SidebarMenu'

export function Sidebar() {
	return (
		<div className='flex flex-col justify-between bg-primary p-[1.5rem] w-[20%] min-h-full'>
			<div className='flex flex-col gap-[3rem]'>
				<Logo />
				<SidebarMenu />
			</div>
		</div>
	)
}
