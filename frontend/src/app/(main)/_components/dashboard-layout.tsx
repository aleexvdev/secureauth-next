"use client";

import { Logo } from "@/components/logo/logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/providers/LanguageProvider";
import { useTheme } from "@/providers/ThemeProvider";
import {
  Bell,
  ChevronRight,
  Globe,
  Home,
  Laptop,
  LogOut,
  Menu,
  Palette,
  Settings,
  Shield,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

interface MobileNavProps {
  pathname: string;
  setOpen: (open: boolean) => void;
}

const navItems: NavItem[] = [
  {
    title: "nav.home",
    href: "/home",
    icon: Home,
  },
  {
    title: "nav.mfa",
    href: "/mfa",
    icon: Shield,
  },
  {
    title: "nav.sessions",
    href: "/sessions",
    icon: Laptop,
    badge: 3,
  },
  {
    title: "nav.appearance",
    href: "/appearance",
    icon: Palette,
  },
  {
    title: "nav.settings",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "nav.profile",
    href: "/profile",
    icon: User,
  },
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);
  const { t, language, setLanguage } = useLanguage();
  const { layout, sidebarPosition, contentWidth, focusMode } = useTheme();

  const user = {
    name: "Alexander Valverde",
    email: "alex@example.com",
    isEmailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    userPreferences: {
      enable2FA: true,
    },
  };

  const sidebarWidth = layout === "compact" ? "w-14" : "w-64";
  const headerHeight = layout === "compact" ? "h-12" : "h-16";
  const contentMargin =
    layout === "compact"
      ? sidebarPosition === "left"
        ? "ml-0 md:ml-14"
        : "mr-0 md:mr-14"
      : sidebarPosition === "left"
      ? "ml-0 md:ml-64"
      : "mr-0 md:mr-64";

      console.log(sidebarPosition)

  return (
    <div
      className={cn(
        "flex min-h-screen flex-col bg-background",
        layout === "compact" && "compact-layout",
        focusMode && "focus-mode"
      )}
    >
      <header
        className={cn(
          "sticky top-0 z-30 flex items-center gap-4 border-b bg-background backdrop-blur-md px-4 md:px-6",
          headerHeight
        )}
      >
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side={sidebarPosition} className="px-0" hideCloseButton>
            <MobileNav pathname={pathname} setOpen={setOpen} />
          </SheetContent>
        </Sheet>
        <div className="lg:flex items-center gap-4 hidden essential header-item">
          <Logo />
          <span
            className={cn("font-semibold", layout === "compact" && "text-sm")}
          >
            SecureAuth
          </span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative header-item"
              >
                <Globe className="h-5 w-5" />
                <span className="sr-only">{t("nav.language")}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("nav.language")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setLanguage("en")}
                className={cn(
                  "cursor-pointer",
                  language === "en" && "bg-accent"
                )}
              >
                {t("appearance.language_english")}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLanguage("es")}
                className={cn(
                  "cursor-pointer",
                  language === "es" && "bg-accent"
                )}
              >
                {t("appearance.language_spanish")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative header-item essential"
              >
                <Bell className="h-5 w-5" />
                <span className="sr-only">{t("nav.notifications")}</span>
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>{t("common.notifications")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-auto">
                {[1, 2, 3].map((i) => (
                  <DropdownMenuItem
                    key={i}
                    className="flex flex-col items-start p-4 cursor-pointer"
                  >
                    <div className="flex w-full justify-between">
                      <span className="font-medium">
                        {t("sessions.login_history")}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {i}h {t("sessions.ago")}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {t("sessions.new_login_detected")}
                    </span>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8 overflow-hidden header-item essential"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="rounded-full bg-muted text-primary">
                    {user?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("profile.your_profile")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer">
                  {t("nav.profile")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer">
                  {t("nav.settings")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer">
                {t("common.logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex flex-1">
        <aside
          className={cn(
            "hidden shrink-0 border-r bg-card/50 md:block fixed top-16 bottom-0 overflow-y-auto sidebar",
            sidebarWidth,
            layout === "compact" ? "top-12" : "top-16",
            sidebarPosition === "left" ? "left-0" : "right-0"
          )}
        >
          <div className="flex h-full flex-col gap-2 p-4">
            <nav className="grid gap-1 py-2">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "sidebar-item group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all focus-ring",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground active"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    layout === "compact" && "justify-center px-2"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-4 w-4",
                      pathname === item.href
                        ? "text-primary-foreground"
                        : "text-muted-foreground group-hover:text-foreground"
                    )}
                  />
                  {layout !== "compact" && t(item.title)}
                  {item.badge && layout !== "compact" && (
                    <Badge
                      variant="outline"
                      className={cn(
                        "ml-auto flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs",
                        pathname === item.href
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </nav>
            <div className="mt-auto">
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start gap-2 text-muted-foreground hover:text-foreground",
                  layout === "compact"
                    ? "justify-center p-2"
                    : "justify-start gap-2"
                )}
              >
                <LogOut className="h-4 w-4" />
                {layout !== "compact" && t("common.logout")}
              </Button>
            </div>
          </div>
        </aside>
        <main
          className={cn(
            "flex-1 overflow-auto animate-in bg-background/80",
            contentMargin
          )}
        >
          <div
            className={cn(
              "p-4 md:p-6 animate-in",
              contentWidth === "container" && "container mx-auto",
              contentWidth === "narrow" && "max-w-4xl mx-auto"
            )}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

function MobileNav({ pathname, setOpen }: MobileNavProps) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col gap-y-2 justify-between h-full">
      <div className="flex flex-col gap-y-4 h-full">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="font-semibold">SecureAuth</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only">Cerrar</span>
          </Button>
        </div>
        <nav className="grid gap-1 px-2 py-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-2">
                <item.icon
                  className={cn(
                    "h-4 w-4",
                    pathname === item.href
                      ? "text-primary-foreground"
                      : "text-muted-foreground"
                  )}
                />
                {t(item.title)}
                {item.badge && (
                  <Badge
                    variant="outline"
                    className={cn(
                      "ml-auto flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs",
                      pathname === item.href
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
              <ChevronRight className="ml-auto h-4 w-4" />
            </Link>
          ))}
        </nav>
      </div>

      <div className=" p-2">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          {t("common.logout")}
        </Button>
      </div>
    </div>
  );
}
