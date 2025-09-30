export const extractFileNameFromUrl = (url: string | null): string | null => {
	if (!url) return null
	return url.split('/').pop()?.trim() || null
}
