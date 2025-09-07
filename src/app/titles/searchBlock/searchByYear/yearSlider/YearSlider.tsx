import { format } from 'date-fns'
import ReactSlider from 'react-slider'

export function YearSlider({
	value,
	onChange
}: {
	value: number | undefined
	onChange: (value: number) => void
}) {
	const currentYear = +format(new Date(), 'yyyy')

	return (
		<ReactSlider
			className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
			thumbClassName='w-5 h-5 bg-blue-600 rounded-full cursor-pointer focus:ring-2 focus:ring-blue-300'
			trackClassName='h-2 rounded-lg'
			value={value ?? 1910}
			onChange={onChange}
			min={1910}
			max={currentYear}
			renderThumb={(props, state) => (
				<div
					{...props}
					className='absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-[.5rem] py-[.5rem] rounded'
				>
					{state.valueNow}
				</div>
			)}
		/>
	)
}
