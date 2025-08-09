import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink, useLocation } from "react-router-dom";
import { Buliding, Cards, Category, Setting2 } from "iconsax-react";

export default function SidebarMenuAdmin() {
  const location = useLocation();
  const items = [
    {
      title: "Dashboard",
      url: "/",
      icon: Category,
    },
    {
      title: "Tenants management",
      url: "/tenants",
      icon: Buliding,
    },
    {
      title: "Plans",
      url: "/plans",
      icon: Cards,
    },
    //{
    //  title: "Settings",
    //  url: "/settings",
    //  icon: Setting2,
    //},
  ];
  return (
    <SidebarMenu>
      {items.map((item, i) => (
        <SidebarMenuItem key={i}>
          <SidebarMenuButton asChild isActive={location.pathname === item.url}>
            <NavLink to={item.url} key={i}>
              <item.icon
                variant="Outline"
                color="CurrentColor"
                size={20}
                className="data-[state=open]:mx-2"
              />
              <span className="font-semibold group-data-[collapsible=icon]:hidden">
                {item.title}
              </span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
