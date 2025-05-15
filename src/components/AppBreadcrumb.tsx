import React from 'react'
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from './ui/breadcrumb'
import { useLocation } from 'react-router-dom'
import { getUrl } from '@/utils/getBreadcrumb'
import { Home } from 'lucide-react'

interface BreadcrumbProps {
  key: string
  icons?: React.ReactNode
  title: React.ReactNode
  url: string
}

const AppBreadcrumb = () => {
  const location = useLocation()

  const breadcrumbItem: BreadcrumbProps[] = [
    {
      title: 'Trang Chủ',
      url: '/',
      key: 'home',
      icons: <Home />,
    },
    ...(getUrl(location.pathname)?.map<BreadcrumbProps>(item => ({
      title: item.label,
      url: item.url,
      key: item.key,
      icons: item.icon,
    })) ?? []),
  ]

  return (
    <BreadcrumbList className='flex-nowrap hidden md:flex'>
      {breadcrumbItem.map((item, idx) => (
        <>
          <BreadcrumbItem key={item.key} className='truncate'>
            <BreadcrumbLink
              href={item.url}
              className='hover:text-[var(--color-sidebar-accent)]'>
              {idx === breadcrumbItem.length - 1 ? (
                <strong>{item.title}</strong>
              ) : (
                item.title
              )}
            </BreadcrumbLink>
          </BreadcrumbItem>
          {idx + 1 < breadcrumbItem.length && <BreadcrumbSeparator />}
        </>
      ))}
    </BreadcrumbList>
  )
}

export default AppBreadcrumb
