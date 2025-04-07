"use client";

import { PageInicio } from "@/components/page-inicio";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-col md:flex-row">
      <div className="flex w-full items-center justify-center bg-white p-8 md:w-1/2">
        {children}
      </div>
      <div className="hidden w-full bg-gradient-to-br from-violet-500 to-indigo-800 md:block md:w-1/2">
        <PageInicio />
      </div>
    </main>
  );
};

export default AuthLayout;