import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from './ui/sidebar'
import useAuth from '@/hooks/useAuth'
import { filterRoutesByRole } from '@/routes/utils/routeFilters'
import { routes } from '@/routes/config'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible'
import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const AppSidebar = () => {
  const { role } = useAuth()
  const navigate = useNavigate()

  const handleMenuClick = (url: string) => {
    navigate(url, { replace: true, flushSync: true })
  }

  const menu = filterRoutesByRole(role, routes)

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarMenu>
          {menu.map(route => (
            <React.Fragment key={route.key}>
              {route.children && route.children.length > 0 ? (
                <Collapsible defaultOpen className='group/collapsible'>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton asChild>
                        <button onClick={() => handleMenuClick(route.url)}>
                          {route.icon}
                          {route.label}
                          <ChevronRight className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90' />
                        </button>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {route.children.map(child => (
                          <SidebarMenuSubItem key={child.url}>
                            <SidebarMenuSubButton asChild>
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
                <SidebarMenuItem>
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
    </Sidebar>
  )
}

export default AppSidebar
