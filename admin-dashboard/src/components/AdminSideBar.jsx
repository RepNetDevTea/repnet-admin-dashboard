import useFetch from "@/hooks/useFetch"
import {
  Link, 
  Navigate, 
} from 'react-router-dom'
import {
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent, 
  SidebarMenu, 
  SidebarMenuItem,
  SidebarMenuButton, 
  SidebarMenuSub, 
  SidebarMenuSubItem, 
  SidebarFooter, 
  SidebarSeparator, 
} from '@/components/ui/sidebar'
import {
  Collapsible, 
  CollapsibleTrigger, 
  CollapsibleContent, 
} from '@/components/ui/collapsible'
import {
  ClipboardPen, 
  Search, 
  User, 
  Globe, 
} from 'lucide-react'
import SidebarCard from '@/components/SidebarCard'
import LogoutAlert from '@/components/LogoutAlert'

const features = [
  { title: 'Reportes', url: 'reports', icon: ClipboardPen }, 
  { title: 'Sitios', url: 'sites', icon: Globe }, 
  // { title: 'Usuarios', url: 'users', icon: User }, 
];

export default function AdminSidebar({ userData }) {

  return (
    userData && (
      <Sidebar variant="floating">
        <SidebarHeader>
          <SidebarCard 
            username={ userData.username } 
          />
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Administración</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton> 
                        <Search /> Buscar 
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        { 
                          features.map(feature => (
                            <SidebarMenuSubItem key={ feature.title }>
                              <SidebarMenuButton asChild>
                                <Link to={`search/${feature.url}`}>
                                  <feature.icon /> { feature.title }
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuSubItem>
                          )) 
                        }
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarGroup>
            <SidebarGroupLabel>Cuenta</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <LogoutAlert />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarFooter>
      </Sidebar>    
    )
  );
}