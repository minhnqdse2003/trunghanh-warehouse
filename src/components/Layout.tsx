import { SidebarProvider, SidebarTrigger } from './ui/sidebar'
import AppSidebar from './AppSidebar'
import AppBreadcrumb from './AppBreadcrumb'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { authQueryClient } from '@/lib/query-client.auth'
import { QUERY_KEYS } from '@/types/constants/query-keys'
import { Card } from './ui/card'
import { Avatar, AvatarFallback } from './ui/avatar'
import useAuth from '@/hooks/use-auth'
import { cn } from '@/lib/utils'

const Layout = () => {
  const [collapsed, setCollapsed] = useState(
    authQueryClient.getQueryData<boolean>([QUERY_KEYS.SIDEBAR_COLLAPSED]),
  )
  const { user } = useAuth()

  useEffect(() => {
    setCollapsed(
      authQueryClient.getQueryData<boolean>([QUERY_KEYS.SIDEBAR_COLLAPSED]),
    )
  }, [])

  return (
    <SidebarProvider
      defaultOpen={collapsed}
      open={collapsed}
      className='w-svw h-svh flex'>
      <AppSidebar />
      <div
        className={cn(
          'flex flex-col transition-[width] duration-200 ease-linear',
          !collapsed ? 'w-full' : 'w-[calc(100%-var(--sidebar-width))]',
        )}>
        <nav className='flex flex-col w-full h-fit my-4 px-[var(--layout-content-pd)]'>
          <Card className='w-full flex-row justify-between p-1.5'>
            <div className='flex items-center gap-2'>
              <SidebarTrigger
                onClick={() =>
                  setCollapsed(prevValue => {
                    authQueryClient.setQueryData(
                      [QUERY_KEYS.SIDEBAR_COLLAPSED],
                      () => !prevValue,
                    )
                    return !prevValue
                  })
                }
                className='hover:cursor-pointer'
              />
              <AppBreadcrumb />
            </div>
            <div className='flex items-center gap-2'>
              <Avatar className='cursor-pointer'>
                <AvatarFallback>{user?.fullName[0]}</AvatarFallback>
              </Avatar>
              <span className='text-xs font-medium'>{`${user?.fullName} (${user?.roleName})`}</span>
            </div>
          </Card>
        </nav>
        <Outlet />
      </div>
    </SidebarProvider>
  )
}

export default Layout
