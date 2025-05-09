import useAuth from '@/hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'
const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to={'/sign-in'} replace />
  }

  return <Outlet />
}

export default ProtectedRoutes
