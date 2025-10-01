export type AuthFormData = {
	email: string
	password: string
	name?: string
	confirmPassword?: string
}

// export type RecoveryFormData = {
// 	email: string
// }

// export type ResetPasswordFormData = {
// 	password: string
// 	confirmPassword: string
// }

export interface OTPVerificationFormData {
	otp: string
}
