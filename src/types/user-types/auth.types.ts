export type AuthFormData = {
	email: string
	password: string
	name?: string
	confirmPassword?: string
}

export interface OTPVerificationFormData {
	otp: string
}
