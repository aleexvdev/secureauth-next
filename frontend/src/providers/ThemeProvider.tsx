"use client";

import type * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";
// import { ThemeProvider as NextThemesProvider } from "next-themes";

type Theme = "dark" | "light" | "system";
type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  accentColor: string;
  setTheme: (theme: Theme) => void;
  setAccentColor: (color: string) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  accentColor: "emerald",
  setTheme: () => null,
  setAccentColor: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({ children, defaultTheme = "system", storageKey = "ui-theme", ...props }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [accentColor, setAccentColor] = useState<string>("emerald");

  useEffect(() => {
    const savedTheme = localStorage.getItem(`${storageKey}-mode`) as Theme;
    const savedAccent = localStorage.getItem(`${storageKey}-accent`);
    if (savedTheme) {
      setTheme(savedTheme);
    }
    if (savedAccent) {
      setAccentColor(savedAccent);
      document.documentElement.setAttribute("data-accent", savedAccent);
    } else {
      document.documentElement.setAttribute("data-accent", accentColor);
    }
  }, [storageKey]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
      return;
    }
    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    accentColor,
    setTheme: (theme: Theme) => {
      localStorage.setItem(`${storageKey}-mode`, theme);
      setTheme(theme);
    },
    setAccentColor: (color: string) => {
      localStorage.setItem(`${storageKey}-accent`, color);
      document.documentElement.setAttribute("data-accent", color);
      setAccentColor(color);
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}