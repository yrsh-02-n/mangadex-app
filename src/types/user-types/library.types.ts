import { ReadingStatus } from '../enums'

export interface IUserLibrary {
	section:
		| ReadingStatus.READING
		| ReadingStatus.PLANNED
		| ReadingStatus.COMPLETED
		| ReadingStatus.PAUSED
		| ReadingStatus.DROPPED
	mangaId: string
}
