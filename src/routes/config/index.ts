import { publicRoutes } from './publicRoutes'
import { categoryRoutes } from './categoryRoutes'
import { customerRoutes } from './customerRoutes'
import type { RoutesProps } from '../types'

export const routes: RoutesProps[] = [
  ...publicRoutes,
  categoryRoutes,
  customerRoutes,
]
