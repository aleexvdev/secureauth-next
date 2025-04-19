"use client";

import { AuthProvider } from "@/providers/AuthProvider";
import React from "react";
import DashboardLayout from "./_components/dashboard-layout";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <AuthProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthProvider>
  );
};

export default MainLayout;
