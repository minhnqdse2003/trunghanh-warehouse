import type { RoutesProps } from '../types'
import { getAccessibleChildrenRoutes, isRouteAccessible } from './accessControl'

export const filterRoutesByRole = (
  role: number,
  routes: RoutesProps[],
): RoutesProps[] =>
  routes
    .filter(item => !item.hidden)
    .filter(item => isRouteAccessible(item, role))
    .map(route => ({
      ...route,
      children: getAccessibleChildrenRoutes(route.children, role),
    }))

export const filterPublicRoutes = (routes: RoutesProps[]): RoutesProps[] =>
  routes.filter(route => !route.allowedRoles && !route.children)
