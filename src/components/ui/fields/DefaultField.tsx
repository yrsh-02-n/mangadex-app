import cn from 'clsx'
import { LucideChevronDown, X } from 'lucide-react'
import { forwardRef } from 'react'

import { IFieldProps } from './fields.types'

export const DefaultField = forwardRef<HTMLInputElement, IFieldProps>(
	(
		{
			variant,
			size,
			icon: Icon,
			error,
			label,
			placeholder,
			fullwidth,
			className,
			defaultValue,
			isEmpty,
			value,
			onClick,
			onChange,
			readOnly,
			...props
		},
		ref
	) => {
		const computedReadOnly = readOnly !== undefined ? readOnly : variant === 'select'

		return (
			<div className={cn('flex flex-col', fullwidth && 'w-full')}>
				{label && <label className='text-black'>{label}</label>}
				<div className={cn('relative flex flex-col', fullwidth && 'w-full')}>
					<input
						ref={ref}
						type='text'
						defaultValue={defaultValue}
						value={value || defaultValue || ''}
						onChange={onChange}
						readOnly={computedReadOnly}
						placeholder={placeholder}
						className={cn(
							'text-white bg-primary rounded px-[.7rem] py-[.5rem] placeholder:text-white/50 placeholder:opacity-100 focus-visible:outline-0 focus:outline-0 outline-0',
							fullwidth && 'w-full',
							size === 'sm' ? 'h-[2rem]' : size === 'md' ? 'h-[3rem]' : 'h-[5rem]',
							variant === 'search' &&
								'pr-[2.5rem] focus-visible:outline-0 focus:outline-0 outline-0',
							variant === 'select' &&
								'pr-[2.5rem] w-full max-h-[2.4rem] cursor-pointer focus-visible:outline-0 focus:outline-0 outline-0',
							className
						)}
						{...props}
					/>
					{Icon && (
						<button className='absolute top-[.25rem] right-[.5rem] text-white'>
							<Icon size={22} />
						</button>
					)}
					{variant === 'select' && (
						<span className='absolute flex items-center justify-between right-0 h-full gap-[.5rem] max-h-[2.4rem] py-[.53rem] pr-[.55rem] pl-0 focus-visible:outline-0 focus:outline-0 outline-0'>
							{isEmpty && (
								<X
									onClick={onClick}
									size={20}
									className='absolute min-w-[20px] min-h-[20px] right-[46px]'
								/>
							)}
							<span className='stretch bg-accent w-[1px] h-full my-[8px]' />
							<LucideChevronDown
								size={20}
								className='text-white opacity-100 stroke-[2.5] transition-colors duration-200 hover:text-accent'
							/>
						</span>
					)}
					{error && <span className='text-xs text-accent mt-[.2rem]'>{error}</span>}
				</div>
			</div>
		)
	}
)

DefaultField.displayName = 'DefaultField'
