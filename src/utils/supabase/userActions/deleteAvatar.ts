export const deleteAvatar = async (fileName: string) => {
	const res = await fetch('/api/delete-avatar', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ fileName })
	})

	if (!res.ok) {
		const error = await res.json()
		throw new Error(error.error || 'Failed to delete avatar')
	}

	const data = await res.json()
	console.log(data.message)
}
