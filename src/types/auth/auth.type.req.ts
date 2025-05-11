export interface AuthenticateInformationRequest {
  username: string
  password: string
  otpCode?: string
  backupCode?: string
  lostOTPCode?: boolean
}
