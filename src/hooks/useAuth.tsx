import { ROLES } from '@/types/role'

interface AuthHookProps {
  isAuthenticated: boolean
  role: number
}

const useAuth = (): AuthHookProps => {
  const isAuthenticated = true
  const role = ROLES.SALEADMIN.value

  return { isAuthenticated, role }
}

export default useAuth
