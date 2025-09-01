import cn from 'clsx'
import { LucideChevronDown } from 'lucide-react'

import { IFieldProps } from './fields.types'

export function DefaultField({
	variant,
	size,
	icon: Icon,
	error,
	label,
	placeholder,
	fullwidth,
	className
}: IFieldProps) {
	return (
		<div className={cn('flex flex-col', fullwidth && 'w-full')}>
			{label && <label className='text-black'>{label}</label>}
			<div className={cn('relative flex', fullwidth && 'w-full')}>
				<input
					className={cn(
						'text-white bg-primary rounded px-[.7rem] py-[.5rem] placeholder:text-white/50 placeholder:opacity-100 focus-visible:outline-0 focus:outline-0',
						fullwidth && 'w-full',
						size === 'sm' ? 'h-[2rem]' : size === 'md' ? 'h-[3rem]' : 'h-[5rem]',
						variant === 'search' && 'pr-[2.5rem]',
						variant === 'select' && 'pr-[2.5rem] w-full max-h-[2.4rem] cursor-pointer',
						className
					)}
					placeholder={placeholder}
				/>
				{Icon && (
					<button className='absolute top-[.25rem] right-[.5rem] text-white'>
						<Icon size={22} />
					</button>
				)}
				{variant === 'select' && (
					<span className='absolute flex items-center justify-between right-0 h-full w-[2.2rem] max-h-[2.4rem] p-[.5rem] pl-0'>
						<span className='stretch bg-accent w-[1px] h-full' />
						<LucideChevronDown
							size={20}
							className='text-white opacity-100 stroke-[2.5] transition-colors duration-200 hover:text-accent'
						/>
					</span>
				)}
				{error && <span className='text-xs text-accent'>{error}</span>}
			</div>
		</div>
	)
}
