import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarInset>
          <Header />
        </SidebarInset>
        <div className="container mx-auto px-4 py-6">
          <Outlet />
        </div>
        <Toaster position="bottom-center" richColors />
      </main>
    </SidebarProvider>
  );
}
