import cn from 'clsx'
import { Search } from 'lucide-react'

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
						'text-white bg-primary rounded p-[1rem] placeholder:text-white/50 placeholder:opacity-100',
						fullwidth && 'w-full',
						size === 'sm' ? 'h-[2rem]' : size === 'md' ? 'h-[3rem]' : 'h-[5rem]',
            variant === 'search' && 'pr-[2.5rem]',
						className
					)}
          placeholder={placeholder}
				/>
				{Icon && (
					<button className='absolute top-[.25rem] right-[.5rem] text-white'>
						<Icon size={22} />
					</button>
				)}
        {error && <span className='text-xs text-accent'>{error}</span>}
			</div>
		</div>
	)
}
