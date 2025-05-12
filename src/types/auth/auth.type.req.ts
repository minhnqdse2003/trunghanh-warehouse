import type { z } from 'zod'
import type { LoginSchema } from './auth.type.schema'

export interface AuthenticateInformationRequest {
  username: string
  password: string
  otpCode?: string
  backupCode?: string
  lostOTPCode?: boolean
}

export type TLogin = z.infer<typeof LoginSchema>
