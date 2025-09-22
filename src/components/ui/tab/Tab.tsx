import cn from 'clsx'

interface ITab {
	onClick: () => void
	name: string
  isActive: boolean
}

export function Tab({ onClick, name, isActive }: ITab) {
	return (
		<div
			className={cn('text-xl text-center w-full pb-[.5rem] border-b-1 cursor-pointer', isActive && 'text-accent border-accent')}
			onClick={onClick}
		>
			{name}
		</div>
	)
}
