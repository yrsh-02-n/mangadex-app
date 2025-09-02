import { ComponentType, InputHTMLAttributes } from 'react'

export interface IFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
	label?: string
	error?: string
	icon?: ComponentType<{ size?: number; className?: string }>
	fullwidth?: boolean
	variant?: 'default' | 'search' | 'select'
	size?: 'sm' | 'md' | 'lg'
	placeholder?: string
	className?: string
	defaultValue?: string[] | string
	isEmpty?: boolean
	onClick?: (e: React.MouseEvent) => void
}
