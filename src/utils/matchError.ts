import { ERROR_MESSAGE } from '@/types/constants/error-messages'
import type { NavigateFunction } from 'react-router-dom'
import { toast } from 'sonner'
import type { z } from 'zod'

export const createErrorHandler = (
  navigate?: NavigateFunction,
  onUserSignOut?: () => void,
  onError?: (error: Error) => void,
) => {
  return (error: Error) => {
    const navigateToSignIn = () => {
      toast(error.message)
      if (onUserSignOut) {
        onUserSignOut()
      }
      if (navigate) {
        navigate('/sign-in', { replace: true, flushSync: true })
      }
    }
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
        if (onError) {
          onError(error)
        } else {
          toast(error.message)
        }
        break
    }

    return error
  }
}

export const joinZodMessage = (error: z.ZodError) =>
  error.errors.map(err => err.message).join('\n')
