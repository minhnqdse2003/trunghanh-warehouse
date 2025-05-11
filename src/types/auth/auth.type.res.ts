export interface AuthenticateInformationResponse {
  token: string
  refreshToken: string
  role: string
  requiresTwoFactor: boolean
}
