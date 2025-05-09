import { SidebarProvider, SidebarTrigger } from './ui/sidebar'
import AppSidebar from './AppSidebar'
import AppBreadcrumb from './AppBreadcrumb'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <SidebarProvider open={collapsed}>
      <AppSidebar />
      <nav className='flex flex-row w-full h-fit items-center'>
        <SidebarTrigger
          onClick={() => setCollapsed(prev => !prev)}
          className='hover:cursor-pointer'
        />
        <AppBreadcrumb />
      </nav>
      <Outlet />
    </SidebarProvider>
  )
}

export default Layout
