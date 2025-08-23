import { SkeletonLoader } from '@/components/ui/skeletonLoader/SkeletonLoader'

import { SlugAttributes } from './SlugAttributes/SlugAttributes'
import { SlugChapters } from './SlugChapters/SlugChapters'
import { MangaRes } from '@/types/api.types'

export function SlugInfo({ data }: MangaRes) {
	return (
		<>
			{data ? (
				<div className='grid grid-cols-[18rem_auto] gap-[2rem]'>
					<SlugAttributes data={data} />
          {/* chapters have different query inside */}
					<SlugChapters /> 
				</div>
			) : (
				<div className='flex gap-[2rem] max-[810px]:flex-col'>
					<SkeletonLoader
						count={1}
						className='w-[19rem] h-[auto] min-w-[18rem] min-h-[19rem] max-[810px]:w-full max-[810px]:max-w-full'
					/>
					<SkeletonLoader
						count={1}
						className='w-full h-full min-h-[19rem]'
					/>
				</div>
			)}
		</>
	)
}
