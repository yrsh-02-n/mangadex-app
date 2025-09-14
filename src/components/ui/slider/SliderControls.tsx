import { ChevronLeft, ChevronRight } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import { SliderNavButton } from './SliderNavButton'

interface Props {
	prevAction: () => void
	nextAction: () => void
	sliderBtnStyles?: string
}

export function SliderControls({ prevAction, nextAction, sliderBtnStyles }: Props) {
	return (
		<div className={twMerge('absolute right-[.5rem] max-md:left bottom-0', sliderBtnStyles)}>
			<div className='flex gap-[1rem] max-lg:gap-[.5rem]'>
				<SliderNavButton
					onClick={prevAction}
					className='max-lg:p-[.05rem]'
				>
					<ChevronLeft size={32} />
				</SliderNavButton>
				<SliderNavButton
					onClick={nextAction}
					className='max-lg:p-[.05rem]'
				>
					<ChevronRight size={32} />
				</SliderNavButton>
			</div>
		</div>
	)
}
