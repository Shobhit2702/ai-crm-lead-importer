'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  FileSpreadsheet,
  Settings as SettingsIcon,
  Menu,
  Bell,
  HelpCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  Sun,
  Moon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'CSV Import', href: '/csv-import', icon: FileSpreadsheet },
  { name: 'Settings', href: '/settings', icon: SettingsIcon },
];

interface SidebarContentProps {
  isMobile?: boolean;
  isSidebarCollapsed: boolean;
  pathname: string;
  onMobileClose?: () => void;
}

const SidebarContent = ({
  isMobile = false,
  isSidebarCollapsed,
  pathname,
  onMobileClose,
}: SidebarContentProps) => (
  <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border select-none">
    {/* Brand Header */}
    <div className={cn(
      "flex items-center justify-between px-6 py-5 border-b border-sidebar-border h-[73px]",
      isSidebarCollapsed && !isMobile && "px-4 justify-center"
    )}>
      {!isSidebarCollapsed || isMobile ? (
        <div className="flex flex-col">
          <span className="font-extrabold text-xl tracking-tight text-indigo-700 dark:text-indigo-400">
            CRM Suite
          </span>
          <span className="text-[9px] font-bold tracking-wider text-muted-foreground uppercase">
            ENTERPRISE TIER
          </span>
        </div>
      ) : (
        <span className="font-black text-xl text-indigo-700 dark:text-indigo-400">
          CS
        </span>
      )}
    </div>

    {/* Nav Menu */}
    <nav className="flex-1 px-4 py-6 space-y-1.5">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href || (item.href === '/dashboard' && pathname === '/');
        return (
          <Link key={item.name} href={item.href} onClick={() => isMobile && onMobileClose && onMobileClose()}>
            <div
              className={cn(
                'flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer group hover:scale-[1.01] active:scale-98',
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-muted-foreground hover:bg-slate-100 hover:text-foreground dark:hover:bg-slate-800/40'
              )}
            >
              <item.icon className={cn('h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-105', isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-muted-foreground')} />
              {(!isSidebarCollapsed || isMobile) && (
                <span className="truncate">{item.name}</span>
              )}
            </div>
          </Link>
        );
      })}
    </nav>

    {/* Profile Footer */}
    <div className={cn(
      "p-4 border-t border-sidebar-border flex items-center gap-3 bg-indigo-50/20 dark:bg-indigo-950/10",
      isSidebarCollapsed && !isMobile && "justify-center p-3"
    )}>
      <Avatar className="h-10 w-10 border-2 border-indigo-100 dark:border-indigo-950 shrink-0">
        <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="Alex Chen" />
        <AvatarFallback className="bg-indigo-600 text-white font-semibold">AC</AvatarFallback>
      </Avatar>
      
      {(!isSidebarCollapsed || isMobile) && (
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-sm font-semibold text-foreground truncate">
            Alex Chen
          </span>
          <span className="text-[11px] text-muted-foreground truncate">
            Admin Account
          </span>
        </div>
      )}
    </div>
  </div>
);

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    alert('Logout functionality placeholder triggered!');
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      {/* Desktop Fixed Sidebar */}
      <aside className={cn(
        "hidden md:block h-full shrink-0 transition-all duration-300 relative z-30",
        isSidebarCollapsed ? "w-[72px]" : "w-[260px]"
      )}>
        <SidebarContent
          isSidebarCollapsed={isSidebarCollapsed}
          pathname={pathname}
        />
        {/* Collapse Button toggle */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="absolute -right-3.5 top-[18px] h-7 w-7 rounded-full shadow-md bg-card border-border hover:bg-accent focus:ring-0 z-40 hidden md:flex"
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </aside>

      {/* Mobile Drawer (Sheet) */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="p-0 w-[270px] border-r-0">
          <SidebarContent
            isMobile
            isSidebarCollapsed={isSidebarCollapsed}
            pathname={pathname}
            onMobileClose={() => setIsMobileOpen(false)}
          />
        </SheetContent>
      </Sheet>

      {/* Main Container */}
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        {/* Sticky Top Navbar */}
        <header className="sticky top-0 z-20 flex h-[73px] items-center justify-between border-b border-border bg-card/85 backdrop-blur-md px-6 select-none shrink-0">
          {/* Left Side: Mobile Burger & Search */}
          <div className="flex items-center gap-4 flex-1 max-w-lg">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>

            {/* Search Input */}
            <div className="relative w-full max-w-md hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
              <Input
                placeholder="Search customers or reports..."
                className="pl-9 pr-4 rounded-full bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800/80 focus-visible:ring-primary focus-visible:bg-card h-9 transition-colors text-sm w-full"
              />
            </div>
          </div>

          {/* Right Side: Notification, Help, Profile Dropdown */}
          <div className="flex items-center gap-3.5">
            {/* Notifications Button */}
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" size="icon" className="relative hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-full h-9 w-9">
                    <Bell className="h-5 w-5 text-muted-foreground/80" />
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#ef4444] animate-pulse" />
                  </Button>
                }
              />
              <DropdownMenuContent align="end" className="w-[300px] p-2">
                <DropdownMenuLabel className="font-semibold text-xs tracking-wide text-muted-foreground px-2 py-1.5 uppercase">Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="py-2 space-y-1 max-h-[250px] overflow-y-auto">
                  <div className="px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer text-xs space-y-0.5">
                    <p className="font-semibold text-foreground">Import successful</p>
                    <p className="text-muted-foreground">Leads_Export_Oct2025 parsed successfully</p>
                    <span className="text-[10px] text-indigo-500 font-medium">10 mins ago</span>
                  </div>
                  <DropdownMenuSeparator />
                  <div className="px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer text-xs space-y-0.5">
                    <p className="font-semibold text-foreground">System Warning</p>
                    <p className="text-muted-foreground">API key rotation schedule due in 3 days</p>
                    <span className="text-[10px] text-indigo-500 font-medium">2 hours ago</span>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Help Button */}
            <Button variant="ghost" size="icon" className="hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-full h-9 w-9">
              <HelpCircle className="h-5 w-5 text-muted-foreground/80" />
            </Button>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full border border-slate-200 dark:border-slate-800 p-0 overflow-hidden hover:scale-105 transition-transform duration-200">
                    <Avatar className="h-full w-full">
                      <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="Alex Chen" />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                  </Button>
                }
              />
              <DropdownMenuContent align="end" className="w-[220px]">
                <DropdownMenuLabel className="flex flex-col px-2 py-1.5">
                  <span className="text-sm font-semibold text-foreground">Alex Chen</span>
                  <span className="text-xs text-muted-foreground">alex.chen@enterprise.com</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                {/* Settings Route Link */}
                <DropdownMenuItem
                  render={
                    <Link href="/settings" className="cursor-pointer flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                  }
                />
                
                <DropdownMenuItem
                  render={
                    <Link href="/settings" className="cursor-pointer flex items-center gap-2">
                      <SettingsIcon className="h-4 w-4" />
                      <span>System Settings</span>
                    </Link>
                  }
                />

                {/* Dark Mode toggle item */}
                <div className="flex items-center justify-between px-2 py-2 text-sm">
                  <div className="flex items-center gap-2 text-foreground">
                    {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                    <span>Dark Mode</span>
                  </div>
                  <Switch
                    checked={theme === 'dark'}
                    onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                  />
                </div>

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive cursor-pointer flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto px-6 py-8 md:px-10 md:py-10 bg-slate-50/50 dark:bg-slate-900/30">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="max-w-[1400px] mx-auto h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
