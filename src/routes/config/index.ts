import { categoryRoutes } from './category-routes.tsx'
import { customerRoutes } from './customer-routes.tsx'
import type { RoutesProps } from '../types'
import { publicRoutes } from './public-routes.tsx'

export const routes: RoutesProps[] = [
  ...publicRoutes,
  categoryRoutes,
  customerRoutes,
]
