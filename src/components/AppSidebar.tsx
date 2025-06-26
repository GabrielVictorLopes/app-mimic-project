
import { 
  Home, 
  FileText, 
  Users, 
  Calendar, 
  BarChart3,
  Scale,
  Settings,
  Briefcase
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Menu",
    url: "/",
    icon: Home,
  },
  {
    title: "Clientes",
    url: "/clientes",
    icon: Users,
  },
  {
    title: "Consultoria",
    url: "/menu",
    icon: Briefcase,
  },
  {
    title: "Casos",
    url: "/casos",
    icon: FileText,
  },
  {
    title: "Agenda",
    url: "/agenda",
    icon: Calendar,
  },
  {
    title: "Relatórios",
    url: "/relatorios",
    icon: BarChart3,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-gray-200 dark:border-gray-700">
      <SidebarHeader className="border-b border-gray-200 dark:border-gray-700 p-3 md:p-4">
        <div className="flex items-center gap-2">
          <Scale className="h-6 w-6 md:h-8 md:w-8 text-blue-600 dark:text-blue-400" />
          <div className="min-w-0">
            <h1 className="font-bold text-base md:text-lg text-gray-900 dark:text-white truncate">Subjudice</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">Sistema de Gestão Jurídica</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 dark:text-gray-300 font-medium px-3 md:px-4 py-2 text-xs md:text-sm">
            Menu Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className={cn(
                      "mx-2 rounded-lg transition-all duration-200 min-h-[44px] touch-manipulation",
                      location.pathname === item.url && "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
                    )}
                  >
                    <Link to={item.url} className="flex items-center gap-3 px-3 py-2 md:py-2">
                      <item.icon className="h-4 w-4 md:h-4 md:w-4 flex-shrink-0" />
                      <span className="text-sm md:text-base truncate">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-gray-200 dark:border-gray-700 p-3 md:p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="mx-2 rounded-lg min-h-[44px] touch-manipulation">
              <Link to="/configuracoes" className="flex items-center gap-3 px-3 py-2">
                <Settings className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm md:text-base">Configurações</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
