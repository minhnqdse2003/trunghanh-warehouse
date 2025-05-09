import type { RoutesProps } from '../types'

export const isRouteAccessible = (route: RoutesProps, role: number): boolean =>
  route.allowedRoles?.includes(role) ?? true

export const getAccessibleChildrenRoutes = (
  routes: RoutesProps[] | undefined,
  role: number,
) => {
  if (!routes || routes?.length === 0) {
    return undefined
  }

  const accessibleChildrenRoutes = routes
    .filter(route => !route.hidden)
    .filter(route => isRouteAccessible(route, role))

  return accessibleChildrenRoutes.length === 0
    ? undefined
    : accessibleChildrenRoutes
}

export const hasAuthorizeByRole = (route: RoutesProps) => route.allowedRoles
