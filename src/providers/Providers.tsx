'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'

export function Providers({ children }: { children: ReactNode }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						retry: 1,
						refetchOnWindowFocus: false
					},
					mutations: {
						retry: 1
					}
				}
			})
	)

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
