'use client'
import dynamic from 'next/dynamic'

const DynamicSidebar = dynamic(() => import('../Sidebar').then(mod => mod.Sidebar), { ssr: false })

export function SidebarClient() {
	return <DynamicSidebar />
}
