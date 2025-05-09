import { routes } from '@/routes/config'
import type { RoutesProps } from '@/routes/types'

export const getUrl = (path: string): RoutesProps[] | undefined => {
  const pathSegments = path.split('/').filter(segment => segment)

  const findRoute = (
    segments: string[],
    routes: RoutesProps[],
  ): RoutesProps[] | undefined => {
    if (segments.length === 0) return undefined

    const [current, ...rest] = segments

    for (const route of routes) {
      if (route.url.includes(`/${current}`)) {
        if (rest.length === 0) {
          return [route]
        }
        if (route.children) {
          const found = findRoute(rest, route.children)
          if (found) return [route, ...found]
        }
      }
    }

    return undefined
  }

  return findRoute(pathSegments, routes)
}
