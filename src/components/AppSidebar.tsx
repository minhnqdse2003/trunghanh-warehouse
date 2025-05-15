import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from './ui/sidebar'
import useAuth from '@/hooks/use-auth'
import { filterRoutesByRole } from '@/routes/utils/routeFilters'
import { routes } from '@/routes/config'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible'
import { ChevronRight, LogOut } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from '@/assets/logo.svg?react'
import { Separator } from './ui/separator'

const AppSidebar = () => {
  const { role, onUserSignOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleMenuClick = (url: string) => {
    navigate(url)
  }

  const menu = filterRoutesByRole(role!, routes)

  return (
    <Sidebar>
      <SidebarHeader className='items-center'>
        <Logo className='w-full h-[100px]' />
        <Separator />
      </SidebarHeader>
      <SidebarContent className='px-3'>
        <SidebarMenu>
          {menu.map(route => (
            <React.Fragment key={route.key}>
              {route.children && route.children.length > 0 ? (
                <Collapsible
                  defaultOpen={location.pathname.includes(route.url)}
                  className='group/collapsible'>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton asChild>
                        <button
                          className='cursor-pointer'
                          onClick={() => handleMenuClick(route.url)}>
                          {route.icon}
                          {route.label}
                          <ChevronRight className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90' />
                        </button>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub className='cursor-pointer'>
                        {route.children.map(child => (
                          <SidebarMenuSubItem key={child.url}>
                            <SidebarMenuSubButton
                              asChild
                              className={
                                location.pathname === child.url
                                  ? activeClass
                                  : ''
                              }>
                              <a href={child.url}>
                                {child.icon}
                                {child.label}
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem className='cursor-pointer'>
                  <SidebarMenuButton asChild>
                    <a href={route.url}>
                      {route.icon}
                      {route.label}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </React.Fragment>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Separator />
        <SidebarMenuButton className='cursor-pointer' onClick={onUserSignOut}>
          <LogOut />
          Đăng xuất
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar

const activeClass = `bg-sidebar-accent text-sidebar-accent-foreground`
