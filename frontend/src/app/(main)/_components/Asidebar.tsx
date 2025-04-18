"use client";

import { Logo } from "@/components/logo/logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  HelpCircle,
  Home,
  Lock,
  Settings,
  User,
  Menu,
  ChevronLeft,
  MoreVertical,
  MoonStarIcon,
  SunIcon,
  LogOut,
} from "lucide-react";

const navigation = [
  { name: "Home", href: "/home", icon: Home },
  { name: "Sessions", href: "/sessions", icon: Lock },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
  // { name: "Invoices", href: "/invoices", icon: Receipt },
  // { name: "Payments", href: "/payments", icon: CreditCard },
  // { name: "Members", href: "/members", icon: Users2 },
  // { name: "Permissions", href: "/permissions", icon: Shield },
  // { name: "Chat", href: "/chat", icon: MessagesSquare },
  // { name: "Meetings", href: "/meetings", icon: Video },
];

const Asidebar = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const user = {
    name: "John Doe",
    email: "john@example.com",
    isEmailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    userPreferences: {
      enable2FA: true,
    },
  };
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const NavItem = ({ item }: { item: any; isBottom?: boolean }) => (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          href={item.href}
          className={cn(
            "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
            pathname === item.href
              ? "bg-secondary text-secondary-foreground"
              : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground",
            isCollapsed && "justify-center px-2"
          )}
        >
          <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
          {!isCollapsed && <span>{item.name}</span>}
        </Link>
      </TooltipTrigger>
      {isCollapsed && (
        <TooltipContent side="right" className="flex items-center gap-4">
          {item.name}
        </TooltipContent>
      )}
    </Tooltip>
  );

  return (
    <TooltipProvider>
      <>
        <button
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-background rounded-md shadow-md"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div
          className={cn(
            "fixed inset-y-0 z-20 flex flex-col bg-background transition-all duration-300 ease-in-out lg:static",
            "border-r border-border",
            isCollapsed ? "w-[72px]" : "w-72",
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          )}
        >
          <div className="border-b border-border">
            <div
              className={cn(
                "flex h-20 items-center gap-2 px-2",
                isCollapsed && "justify-center px-2"
              )}
            >
              {!isCollapsed && (
                <Link href="/home" className="flex items-center font-semibold">
                  <Logo />
                  <span className="text-lg ml-4">SecureAuth</span>
                </Link>
              )}
              <Button
                variant="ghost"
                size="sm"
                className={cn("ml-auto h-8 w-8", isCollapsed && "ml-0")}
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                <ChevronLeft
                  className={cn(
                    "h-4 w-4 transition-transform",
                    isCollapsed && "rotate-180"
                  )}
                />
                <span className="sr-only">
                  {isCollapsed ? "Expand" : "Collapse"} Sidebar
                </span>
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            <nav className="flex-1 space-y-1 px-2 py-4">
              {navigation.map((item) => (
                <NavItem key={item.name} item={item} />
              ))}
            </nav>
          </div>
          <div className="px-2 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 select-none">
                <Avatar className="w-10 h-10 rounded-full">
                  <AvatarFallback className="rounded-full bg-muted text-primary">
                    {user?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <div className="grid flex-1 text-left text-sm leading-snug">
                    <span className="font-semibold">{user?.name}</span>
                    <span className="text-xs text-muted-foreground block truncate">
                      {user?.email}
                    </span>
                  </div>
                )}
              </div>
              {!isCollapsed && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-5 w-5" />
                      <span className="sr-only">Opciones de usuario</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56 mt-2 rounded-lg shadow-lg"
                    side="bottom"
                    align="end"
                    sideOffset={4}
                  >
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() =>
                          setTheme(theme === "light" ? "dark" : "light")
                        }
                        className="cursor-pointer gap-2"
                      >
                        {theme === "light" ? <MoonStarIcon /> : <SunIcon />}
                        <span className="text-sm font-medium">
                          {theme === "light" ? "Dark" : "Light"} mode
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer gap-2 text-red-600 hover:bg-red-50">
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm font-medium">Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
      </>
    </TooltipProvider>
  );
};

export default Asidebar;
