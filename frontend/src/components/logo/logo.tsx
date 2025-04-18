"use client";

import { ShieldCheck } from "lucide-react";
import React from "react";


export const Logo = () => {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary dark:bg-primary-dark text-white dark:text-black">
      <ShieldCheck className="h-6 w-6" />
    </div>
  );
};
