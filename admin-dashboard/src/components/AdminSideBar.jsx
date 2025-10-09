// import useFetch from "@/hooks/useFetch"
import {Link, Navigate} from "react-router-dom";
import {ClipboardPen, Search, User, Globe, Activity, Gamepad2} from "lucide-react";
import {
  Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarGroupLabel, 
  SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, 
  SidebarMenuSub, SidebarMenuSubItem, SidebarFooter, SidebarSeparator
} from "@/components/ui/sidebar";
import {
  Collapsible, CollapsibleTrigger, CollapsibleContent
} from "@/components/ui/collapsible"

import SidebarCard from "@/components/SidebarCard";
import LogoutAlert from "@/components/LogoutAlert"; 

const features = [
  {title: "Partidas", url: "matches", icon: Activity}, 
  {title: "Niveles", url: "levels", icon: Gamepad2}
];

export default function AdminSidebar() {
  // const {data, error} = useFetch("http://localhost:3000/teachers/details");

  const data = {
    name: 'roberto',
    ownedByClass: '2a',
  };

  // if (error)
  //   return (<Navigate to="/" replace={true} />);

  return (
    data && (
      <Sidebar variant="floating">
        <SidebarHeader>
          <SidebarCard 
            teacherName={data.name} 
            teacherClass={data.ownedByClass}
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
                        <SidebarMenuSubItem key="reports">
                          <SidebarMenuButton asChild>
                            <Link to="search/reports">
                              <ClipboardPen /> Reportes
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem key="sites">
                          <SidebarMenuButton asChild>
                            <Link to="search/sites">
                              <Globe /> Sitios
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem key="users">
                          <SidebarMenuButton asChild>
                            <Link to="search/users">
                              <User /> Usuarios
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
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
                  <SidebarMenuButton asChild>
                    <LogoutAlert />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarFooter>
      </Sidebar>    
    )
  );
}