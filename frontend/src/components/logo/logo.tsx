"use client";

import { ShieldCheck } from "lucide-react";
import React from "react";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className = "bg-primary dark:bg-primary-dark text-white dark:text-black" }: LogoProps) => {
  return (
    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${className}`}>
      <ShieldCheck className="h-6 w-6" />
    </div>
  );
};
