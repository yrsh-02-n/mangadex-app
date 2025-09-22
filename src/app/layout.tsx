import '@/app/globals.css'
import { murecho } from '@/lib/fonts'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='ru'>
			<body className={`${murecho.variable} antialiased`}>{children}</body>
		</html>
	)
}
