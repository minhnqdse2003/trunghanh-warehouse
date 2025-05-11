import useAuth from '@/hooks/use-auth'
import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoutes = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode
  allowedRoles: number[]
}) => {
  const { role } = useAuth()

  if (!allowedRoles.includes(role)) {
    return <Navigate to={'403'} replace />
  }

  return children
}

export default PrivateRoutes
