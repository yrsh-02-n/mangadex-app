export const isPlaceholderAvatar = (fileName: string): boolean => {
	return fileName.includes('avatar-placeholder') || fileName === 'avatar-placeholder.png'
}
