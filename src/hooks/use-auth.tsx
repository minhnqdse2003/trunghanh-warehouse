import { authQueryClient } from '@/lib/query-client.auth'
import type {
  AuthenticateInformationResponse,
  AuthIdentityResponse,
} from '@/types/auth/auth.type.res'
import { apiClient } from '@/lib/interceptor'
import { AccountControllerEndpoints } from '@/services'
import { QUERY_KEYS } from '@/types/constants/query-keys'
import type {
  AuthenticationInformationData,
  TAuthenticationUserInformation,
} from '@/types/auth/auth.type'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'
import { matchUserRole } from '@/utils/matchUserRole'

interface AuthHookProps {
  isAuthenticated: boolean
  role: number | undefined
  onUserSignOut: () => void
  onUserSignIn: (data: AuthenticateInformationResponse) => Promise<void>
  user?: TAuthenticationUserInformation
}

const useAuth = (): AuthHookProps => {
  const { mutateAsync } = useMutation<AuthIdentityResponse>({
    mutationFn: async () =>
      await apiClient(`${AccountControllerEndpoints.whoami}`),
    mutationKey: [QUERY_KEYS.WHO_AM_I],
    onSuccess: data => setAuthIdentity(data),
  })
  const navigate = useNavigate()

  const onUserSignOut = useCallback(() => {
    authQueryClient.removeQueries({ queryKey: [QUERY_KEYS.AUTH] })
    navigate('/sign-in', { flushSync: true, replace: true })
  }, [navigate])

  const setAuthIdentity = useCallback((data: AuthIdentityResponse) => {
    authQueryClient.setQueryData(
      [QUERY_KEYS.AUTH],
      (prev: AuthenticationInformationData) => {
        return {
          ...prev,
          user: {
            email: data.email,
            fullName: data.fullName,
            roleName: data.roleName,
          },
        } as AuthenticationInformationData
      },
    )
  }, [])

  const setAuthToken = useCallback((data: AuthenticateInformationResponse) => {
    authQueryClient.setQueryData(
      [QUERY_KEYS.AUTH],
      (prev: AuthenticationInformationData) => {
        return {
          ...prev,
          token: data.token,
          refreshToken: data.refreshToken,
          role: matchUserRole(data.role),
        } as AuthenticationInformationData
      },
    )
  }, [])

  const onUserSignIn = useCallback(
    async (data: AuthenticateInformationResponse) => {
      setAuthToken(data)
      await mutateAsync()
      navigate('/', { replace: true })
    },
    [mutateAsync, navigate, setAuthToken],
  )

  return {
    isAuthenticated:
      !!authQueryClient.getQueryData<AuthenticationInformationData>([
        QUERY_KEYS.AUTH,
      ]),
    role: authQueryClient.getQueryData<AuthenticationInformationData>([
      QUERY_KEYS.AUTH,
    ])?.role,
    onUserSignOut,
    onUserSignIn,
    user: authQueryClient.getQueryData<AuthenticationInformationData>([
      QUERY_KEYS.AUTH,
    ])?.user,
  }
}

export default useAuth
