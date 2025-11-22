import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import SidebarMenuAdmin from "@/layouts/admin/SidebarMenuAdmin";
import LogoutButton from "./LogoutButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { More } from "iconsax-react";
import img from "@/assets/images/avatar.png";
import logoLt from "@/assets/images/logoSidebarLatino.png";
import { useAuth } from "@/hooks/useAuth";

export function AppSidebar() {
  const { user } = useAuth();
  return (
    <Sidebar
      collapsible="icon"
    >
      <SidebarHeader className="h-16 px-3 py-3 font-bold transition-all duration-300">
        <img
          src={logoLt}
          alt="Rawdatee Logo"
          className="h-full object-contain group-data-[collapsible=icon]:hidden"
        />
        <img
          src="rawdatee.png"
          alt="Rawdatee Logo"
          className="h-full object-contain group-data-[collapsible=icon]:block hidden"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {user && <SidebarMenuAdmin />}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className={"border-border border-2 rounded-lg"}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" asChild>
                  <div>
                    <div className="flex aspect-square size-8 items-center justify-center bg-transbarnt text-sidebar-accent-foreground">
                      <img
                        src={
                          user?.image
                            ? import.meta.env.VITE_API_URL_PICTURE + user?.image
                            : img
                        }
                        alt="User"
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user.name}
                      </span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                    <More
                      size={16}
                      color="var(--muted-foreground)"
                      className="rotate-90"
                    />
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[var(--radix-popper-anchor-width)] rounded-lg"
              >
                <DropdownMenuItem className="p-0">
                  <LogoutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}