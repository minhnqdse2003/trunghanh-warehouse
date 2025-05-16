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
        <React.Fragment key={item.key}>
          <BreadcrumbItem key={item.key} className='truncate'>
            <BreadcrumbLink
              href={item.url}
              className='hover:text-[var(--hover-text-color)]'>
              {idx === breadcrumbItem.length - 1 ? (
                <strong className='text-[var(--text-color)] hover:text-[var(--hover-text-color)]'>
                  {item.title}
                </strong>
              ) : (
                item.title
              )}
            </BreadcrumbLink>
          </BreadcrumbItem>
          {idx + 1 < breadcrumbItem.length && <BreadcrumbSeparator />}
        </React.Fragment>
      ))}
    </BreadcrumbList>
  )
}

export default AppBreadcrumb
