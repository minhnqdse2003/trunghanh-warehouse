import useAuth from '@/hooks/use-auth'
import { Navigate, Outlet } from 'react-router-dom'
const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to={'/sign-in'} replace />
  }

  return <Outlet />
}

export default ProtectedRoutes
