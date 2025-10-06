import { useQuery } from '@tanstack/react-query'

import { getUserLibrary } from '../mangaActions/mangaActions'

export const useUserLibrary = () => {
	return useQuery({
		queryKey: ['userLibrary'],
		queryFn: getUserLibrary
	})
}
