import { ERROR_MESSAGE } from '@/types/constants/error-messages'
import { toast } from 'sonner'

export const createErrorHandler = (
  navigate?: (path: string, options?: unknown) => void,
  onUserSignOut?: () => void,
) => {
  return (error: Error) => {
    console.error('Error caught:', error)

    switch (error.message) {
      case ERROR_MESSAGE.ALREADY_LOGGED_IN:
        toast(error.message)
        if (onUserSignOut) {
          onUserSignOut()
        }
        if (navigate) {
          navigate('/sign-in', { replace: true, flushSync: true })
        }
        break
      case ERROR_MESSAGE.FORBIDDEN:
        toast(error.message)
        if (navigate) {
          navigate('403', { replace: true, flushSync: true })
        }
        break
      case ERROR_MESSAGE.NO_REFRESH_TOKEN_AVAILABLE:
        toast(error.message)
        if (onUserSignOut) {
          onUserSignOut()
        }
        if (navigate) {
          navigate('/sign-in', { replace: true, flushSync: true })
        }
        break
      case ERROR_MESSAGE.UNAUTHORIZED:
        toast(error.message)
        if (onUserSignOut) {
          onUserSignOut()
        }
        if (navigate) {
          navigate('/sign-in', { replace: true, flushSync: true })
        }
        break
      default:
        // Handle generic errors
        toast.error('An error occurred')
        break
    }

    return error
  }
}
