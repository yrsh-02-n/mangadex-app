export const sortStringAsNumberOrLocale = (
	a: string,
	b: string,
	noSortLastValue: string
): number => {
	if (a === noSortLastValue) return 1
	if (b === noSortLastValue) return -1

	const numA = parseFloat(a)
	const numB = parseFloat(b)

	if (!isNaN(numA) && !isNaN(numB)) {
		return numA - numB
	}

	if (!isNaN(numA)) return -1
	if (!isNaN(numB)) return 1

	return a.localeCompare(b)
}
