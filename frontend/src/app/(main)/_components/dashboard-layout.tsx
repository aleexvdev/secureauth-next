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
import {
  Bell,
  ChevronRight,
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
import React, { useEffect, useState } from "react";

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
    title: "Inicio",
    href: "/home",
    icon: Home,
  },
  {
    title: "Seguridad MFA",
    href: "/mfa",
    icon: Shield,
  },
  {
    title: "Sesiones",
    href: "/sessions",
    icon: Laptop,
    badge: 3,
  },
  {
    title: "Apariencia",
    href: "/appearance",
    icon: Palette,
  },
  {
    title: "Configuración",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Perfil",
    href: "/profile",
    icon: User,
  }
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-md px-4 md:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="px-0" hideCloseButton>
            <MobileNav pathname={pathname} setOpen={setOpen} />
          </SheetContent>
        </Sheet>
        <div className="lg:flex items-center gap-4 hidden">
          <Logo />
          <span className="font-semibold text-xl">SecureAuth</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notificaciones</span>
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-auto">
                {[1, 2, 3].map((i) => (
                  <DropdownMenuItem
                    key={i}
                    className="flex flex-col items-start p-4 cursor-pointer"
                  >
                    <div className="flex w-full justify-between">
                      <span className="font-medium">
                        Nuevo inicio de sesión
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Hace {i}h
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Se detectó un nuevo inicio de sesión desde Madrid, España
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
                className="rounded-full h-8 w-8 overflow-hidden"
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
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer">
                  Perfil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer">
                  Configuración
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer">
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 shrink-0 border-r bg-card/50 md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <nav className="grid gap-1 p-2">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground focus-ring",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
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
                  {item.title}
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
                </Link>
              ))}
            </nav>
            <div className="mt-auto px-2">
              <Button
                variant="outline"
                className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </aside>
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 md:p-6 animate-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

function MobileNav({ pathname, setOpen }: MobileNavProps) {
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
                {item.title}
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
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
}
