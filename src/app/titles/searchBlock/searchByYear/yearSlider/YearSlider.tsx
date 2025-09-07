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
		<div className='w-full px-3'>
			<ReactSlider
				value={value ?? 1910}
				onChange={onChange}
				min={1910}
				max={currentYear}
				className='w-full h-1'
				thumbClassName='w-2 h-2 bg-white rounded-full cursor-pointer shadow-md focus:outline-none focus:ring-2 focus:ring-white'
				renderThumb={(props, state) => (
					<div {...props}>
						<div className='absolute -top-8 left-1/2 transform -translate-x-1/2 bg-accent text-white text-xs px-2 py-1 rounded whitespace-nowrap z-20'>
							{state.valueNow}
						</div>
					</div>
				)}
				renderTrack={(props, state) => (
					<div
						{...props}
						className={`
							h-2 rounded-full
							${state.index === 0 ? 'bg-accent' : 'bg-bg'}
						`}
					/>
				)}
			/>
		</div>
	)
}
