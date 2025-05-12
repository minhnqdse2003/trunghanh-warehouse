import { queryClient } from '@/lib/query-client'
import type { AuthenticateInformationRequest } from '@/types/auth/auth.type.req'
import { LoginSchema } from '@/types/auth/auth.type.schema'
import { ROLES } from '@/types/role'
import { toast } from 'sonner'
import { z } from 'zod'

interface AuthHookProps {
  isAuthenticated: boolean
  role: number
  onUserSignOut: () => void
  onUserSignIn: (data: AuthenticateInformationRequest) => void
}

const useAuth = (): AuthHookProps => {
  const isAuthenticated = false
  const role = ROLES.ADMIN

  const onUserSignOut = () => {
    queryClient.clear()
  }

  const onUserSignIn = (data: AuthenticateInformationRequest) => {
    try {
      const validatedLoginData = LoginSchema.parse(data)
      console.log(validatedLoginData)
    } catch (error) {
      let errorMessages
      if (error instanceof z.ZodError) {
        errorMessages = error.errors.map(err => err.message).join('\n')
        toast('Sai thông tin', {
          description: errorMessages,
        })
        return
      }
      toast(errorMessages)
    }
  }

  return { isAuthenticated, role, onUserSignOut, onUserSignIn }
}

export default useAuth
