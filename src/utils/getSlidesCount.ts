export const getSlidesCount = () => {
	const width = window.innerWidth

	if (width >= 1280) {
		return 6
	} else if (width >= 1024) {
		return 4
	} else if (width >= 768) {
		return 3
	} else {
		return 1
	}
}
