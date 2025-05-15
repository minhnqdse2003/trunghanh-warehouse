import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom'
import { filterPublicRoutes } from './utils/routeFilters'
import { routes } from './config'
import Layout from '@/components/Layout'
import { generatePrivateRoutes } from './utils/privateRouteGenerator'
import ProtectedRoutes from './config/protected-routes'

const renderPublicDom = () => {
  return filterPublicRoutes(routes).map(route => (
    <Route key={route.key} path={route.url} element={route.element} />
  ))
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {renderPublicDom()}
      <Route path='/' element={<ProtectedRoutes />}>
        <Route path='/' element={<Layout />}>
          {generatePrivateRoutes(routes)}
        </Route>
      </Route>

      <Route path='*' element={<Navigate to={'/404'} replace />} />
    </>,
  ),
)

export default router
