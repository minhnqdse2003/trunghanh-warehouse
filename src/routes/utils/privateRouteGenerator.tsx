import { Route } from 'react-router-dom'
import PrivateRoutes from '../config/PrivateRoutes'
import type { RoutesProps } from '../types'
import { hasAuthorizeByRole } from './accessControl'

export const generatePrivateRoutes = (routes: RoutesProps[]) => {
  return routes.filter(hasAuthorizeByRole).map(route => {
    if (route.index) {
      return (
        <Route
          key={route.key}
          element={
            route.allowedRoles ? (
              <PrivateRoutes allowedRoles={route.allowedRoles}>
                {route.element}
              </PrivateRoutes>
            ) : (
              route.element
            )
          }
          index
        />
      )
    }

    return (
      <Route
        key={route.key}
        path={route.url}
        element={
          route.allowedRoles ? (
            <PrivateRoutes allowedRoles={route.allowedRoles}>
              {route.element}
            </PrivateRoutes>
          ) : (
            route.element
          )
        }>
        {route.children && generatePrivateRoutes(route.children)}
      </Route>
    )
  })
}
