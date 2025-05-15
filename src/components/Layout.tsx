import { SidebarProvider, SidebarTrigger } from './ui/sidebar'
import AppSidebar from './AppSidebar'
import AppBreadcrumb from './AppBreadcrumb'
import { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { authQueryClient } from '@/lib/query-client.auth'
import { QUERY_KEYS } from '@/types/constants/query-keys'
import { Card } from './ui/card'
import { Avatar, AvatarFallback } from './ui/avatar'
import useAuth from '@/hooks/use-auth'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/hooks/use-mobile'

const Layout = () => {
  const [collapsed, setCollapsed] = useState(
    authQueryClient.getQueryData<boolean>([QUERY_KEYS.SIDEBAR_COLLAPSED]),
  )
  const { user } = useAuth()
  const isMobile = useIsMobile()
  const [isNavbarVisible, setIsNavbarVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    setCollapsed(
      authQueryClient.getQueryData<boolean>([QUERY_KEYS.SIDEBAR_COLLAPSED]),
    )
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY.current) {
        setIsNavbarVisible(false)
      } else {
        setIsNavbarVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const onClickCollapsedSidebar = async () => {
    const newCollapsedState = !collapsed

    await authQueryClient.setQueryData(
      [QUERY_KEYS.SIDEBAR_COLLAPSED],
      () => newCollapsedState,
    )

    setCollapsed(newCollapsedState)
  }

  return (
    <SidebarProvider
      defaultOpen={collapsed}
      open={collapsed}
      className='w-svw h-svh flex'>
      <AppSidebar />
      <div
        className={cn(
          'flex flex-col transition-[width] duration-200 ease-linear bg-gray-50 relative',
          !collapsed || isMobile
            ? 'w-full [&>nav]:px-0 [&>nav]:my-0 [&>nav>[data-slot=card]]:rounded-none'
            : 'w-[calc(100%-var(--sidebar-width))]',
        )}>
        <nav
          className={cn(
            'flex flex-col w-full h-fit my-4 px-[var(--layout-content-pd)] sticky right-0 top-0 z-10 transition-transform duration-300 ease-in-out',
            isNavbarVisible ? 'translate-y-0' : '-translate-y-full',
          )}>
          <Card className='w-full flex-row justify-between px-5 py-2'>
            <div className='flex items-center gap-2'>
              <SidebarTrigger
                onClick={onClickCollapsedSidebar}
                className='hover:cursor-pointer'
              />
              <AppBreadcrumb />
            </div>
            <div className='flex items-center gap-1'>
              <Avatar className='cursor-pointer'>
                <AvatarFallback>{user?.fullName[0]}</AvatarFallback>
              </Avatar>
              <div className='text-sm font-medium'>
                <p className='leading-4'>{user?.fullName}</p>
              </div>
            </div>
          </Card>
        </nav>
        <div className={!isMobile ? 'mx-[var(--layout-content-pd)]' : ''}>
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Layout
