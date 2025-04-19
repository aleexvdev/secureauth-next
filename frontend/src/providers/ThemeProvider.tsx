"use client";

import type * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";
type AccentColor = "emerald" | "blue" | "violet" | "rose" | "amber";
type Layout = "default" | "compact";
type SidebarPosition = "left" | "right";
type ContentWidth = "container" | "full" | "narrow";

interface UserPreferences {
  theme: Theme;
  accentColor: AccentColor;
  layout: Layout;
  sidebarPosition: SidebarPosition;
  contentWidth: ContentWidth;
  fontScale: number;
  reducedMotion: boolean;
  highContrast: boolean;
  focusMode: boolean;
}

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = UserPreferences & {
  setTheme: (theme: Theme) => void;
  setAccentColor: (color: AccentColor) => void;
  setLayout: (layout: Layout) => void;
  setSidebarPosition: (position: SidebarPosition) => void;
  setContentWidth: (width: ContentWidth) => void;
  setFontScale: (scale: number) => void;
  setReducedMotion: (reducedMotion: boolean) => void;
  setHighContrast: (highContrast: boolean) => void;
  setFocusMode: (focusMode: boolean) => void;
  resetPreferences: () => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  accentColor: "emerald",
  layout: "default",
  sidebarPosition: "left",
  contentWidth: "container",
  fontScale: 100,
  reducedMotion: false,
  highContrast: false,
  focusMode: false,
  setTheme: () => null,
  setAccentColor: () => null,
  setLayout: () => null,
  setSidebarPosition: () => null,
  setContentWidth: () => null,
  setFontScale: () => null,
  setReducedMotion: () => null,
  setHighContrast: () => null,
  setFocusMode: () => null,
  resetPreferences: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [accentColor, setAccentColorState] = useState<AccentColor>("emerald");
  const [layout, setLayoutState] = useState<Layout>("default");
  const [sidebarPosition, setSidebarPositionState] =
    useState<SidebarPosition>("left");
  const [contentWidth, setContentWidthState] = useState<ContentWidth>("container");
  const [fontScale, setFontScaleState] = useState<number>(100);
  const [reducedMotion, setReducedMotionState] = useState<boolean>(false);
  const [highContrast, setHighContrastState] = useState<boolean>(false);
  const [focusMode, setFocusModeState] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);

    const savedTheme = localStorage.getItem(`${storageKey}-mode`) as Theme;
    const savedAccent = localStorage.getItem(
      `${storageKey}-accent`
    ) as AccentColor;
    const savedLayout = localStorage.getItem(`${storageKey}-layout`) as Layout;
    const savedSidebarPosition = localStorage.getItem(
      `${storageKey}-sidebar-position`
    ) as SidebarPosition;
    const savedContentWidth = localStorage.getItem(
      `${storageKey}-content-width`
    ) as ContentWidth;
    const savedFontScale = localStorage.getItem(`${storageKey}-font-scale`);
    const savedReducedMotion = localStorage.getItem(
      `${storageKey}-reduced-motion`
    );
    const savedHighContrast = localStorage.getItem(
      `${storageKey}-high-contrast`
    );
    const savedFocusMode = localStorage.getItem(`${storageKey}-focus-mode`);

    if (savedTheme) setThemeState(savedTheme);
    if (savedAccent) setAccentColorState(savedAccent);
    if (savedLayout) setLayoutState(savedLayout);
    if (savedSidebarPosition) setSidebarPositionState(savedSidebarPosition);
    if (savedContentWidth) setContentWidthState(savedContentWidth);
    if (savedFontScale) setFontScaleState(Number.parseInt(savedFontScale));
    if (savedReducedMotion) setReducedMotionState(savedReducedMotion === "true");
    if (savedHighContrast) setHighContrastState(savedHighContrast === "true");
    if (savedFocusMode) setFocusModeState(savedFocusMode === "true");
  }, [storageKey]);

  useEffect(() => {
    if (!isMounted) return;
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    document.documentElement.setAttribute("data-accent", accentColor);
  }, [accentColor, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    document.documentElement.setAttribute("data-layout", layout);
  }, [layout, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    document.documentElement.setAttribute(
      "data-sidebar-position",
      sidebarPosition
    );
  }, [sidebarPosition, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    document.documentElement.setAttribute("data-content-width", contentWidth);
  }, [contentWidth, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    document.documentElement.style.fontSize = `${fontScale}%`;
  }, [fontScale, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    if (reducedMotion) {
      document.documentElement.classList.add("reduce-motion");
    } else {
      document.documentElement.classList.remove("reduce-motion");
    }
  }, [reducedMotion, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    if (highContrast) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  }, [highContrast, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    if (focusMode) {
      document.documentElement.classList.add("focus-mode");
    } else {
      document.documentElement.classList.remove("focus-mode");
    }
  }, [focusMode, isMounted]);

  const setTheme = (theme: Theme) => {
    setThemeState(theme);
    localStorage.setItem(`${storageKey}-mode`, theme);
  };
  const setAccentColor = (color: AccentColor) => {
    setAccentColorState(color);
    localStorage.setItem(`${storageKey}-accent`, color);
  };
  const setLayout = (layout: Layout) => {
    setLayoutState(layout);
    localStorage.setItem(`${storageKey}-layout`, layout);
  };
  const setSidebarPosition = (position: SidebarPosition) => {
    setSidebarPositionState(position);
    localStorage.setItem(`${storageKey}-sidebar-position`, position);
  };
  const setContentWidth = (width: ContentWidth) => {
    setContentWidthState(width);
    localStorage.setItem(`${storageKey}-content-width`, width);
  };
  const setFontScale = (scale: number) => {
    setFontScaleState(scale);
    localStorage.setItem(`${storageKey}-font-scale`, scale.toString());
  };
  const setReducedMotion = (reducedMotion: boolean) => {
    setReducedMotionState(reducedMotion);
    localStorage.setItem(
      `${storageKey}-reduced-motion`,
      reducedMotion.toString()
    );
  };
  const setHighContrast = (highContrast: boolean) => {
    setHighContrastState(highContrast);
    localStorage.setItem(
      `${storageKey}-high-contrast`,
      highContrast.toString()
    );
  };
  const setFocusMode = (focusMode: boolean) => {
    setFocusModeState(focusMode);
    localStorage.setItem(`${storageKey}-focus-mode`, focusMode.toString());
  };

  const resetPreferences = () => {
    setTheme("system");
    setAccentColor("emerald");
    setLayout("default");
    setSidebarPosition("left");
    setContentWidth("container");
    setFontScale(100);
    setReducedMotion(false);
    setHighContrast(false);
    setFocusMode(false);
  };

  const value = {
    theme,
    accentColor,
    layout,
    sidebarPosition,
    contentWidth,
    fontScale,
    reducedMotion,
    highContrast,
    focusMode,
    setTheme,
    setAccentColor,
    setLayout,
    setSidebarPosition,
    setContentWidth,
    setFontScale,
    setReducedMotion,
    setHighContrast,
    setFocusMode,
    resetPreferences
  };

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
};
