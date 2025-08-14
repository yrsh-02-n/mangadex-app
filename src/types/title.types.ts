import { ContentRating, PublicationDemographic, ReadingStatus, Status } from './enums'

export interface ITitle {
	id: string
	type: string
	publicationDemographic: PublicationDemographic
	status: Status
	readingStatus: ReadingStatus
  contentRating: ContentRating
}
