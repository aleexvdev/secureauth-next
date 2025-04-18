import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/providers/AuthProvider";
import React from "react";
import Asidebar from "./_components/Asidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Asidebar />
        <SidebarInset>
          <main className="flex min-h-screen flex-col md:flex-row">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
};

export default MainLayout;