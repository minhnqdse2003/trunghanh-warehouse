import { ERROR_MESSAGE } from '@/types/constants/error-messages'
import { useCallback, useEffect } from 'react'
import { toast } from 'sonner'
import useAuth from './use-auth'
import { useNavigate } from 'react-router-dom'

const useErrorMatch = (error: Error) => {
  const { onUserSignOut } = useAuth()
  const navigate = useNavigate()

  const navigateToSignIn = useCallback(() => {
    toast(error.message)
    if (onUserSignOut) {
      onUserSignOut()
    }
    if (navigate) {
      navigate('/sign-in', { replace: true, flushSync: true })
    }
  }, [error.message, navigate, onUserSignOut])

  useEffect(() => {
    switch (error.message) {
      case ERROR_MESSAGE.ALREADY_LOGGED_IN:
        navigateToSignIn()
        break
      case ERROR_MESSAGE.FORBIDDEN:
        toast(error.message)
        if (navigate) {
          navigate('403', { replace: true, flushSync: true })
        }
        break
      case ERROR_MESSAGE.NO_REFRESH_TOKEN_AVAILABLE:
        navigateToSignIn()
        break
      case ERROR_MESSAGE.UNAUTHORIZED:
        navigateToSignIn()
        break
      default:
        toast.error(error.message)
        break
    }
  }, [error, navigate, navigateToSignIn])
}

export default useErrorMatch
