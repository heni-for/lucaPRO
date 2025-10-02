'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useApp } from '@/hooks/use-app';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Bell, Search } from 'lucide-react';
import { AppSidebarNav } from '@/components/app-sidebar-nav';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

function Header() {
  const { t } = useApp();
  const { isMobile } = useSidebar();
  
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-transparent px-4 lg:h-[60px] lg:px-6">
      {isMobile && <SidebarTrigger />}
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t('search_emails')}
              className="w-full appearance-none bg-background/60 pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <ThemeSwitcher />
      <LanguageSwitcher />
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <Bell className="h-4 w-4" />
        <span className="sr-only">Toggle notifications</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://i.pravatar.cc/40?u=user" alt="@user" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t('my_account')}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{t('settings')}</DropdownMenuItem>
          <DropdownMenuItem>{t('support')}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/">{t('logout')}</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}


export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { dir } = useApp();
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-950">
      <SidebarProvider>
        <Sidebar
          variant="sidebar"
          collapsible="icon"
          className="border-sidebar-border bg-background/80 backdrop-blur-sm text-sidebar-foreground"
          side={dir === 'rtl' ? 'right' : 'left'}
        >
          <SidebarHeader className="p-4">
            <Logo />
          </SidebarHeader>
          <SidebarContent className="p-2">
            <AppSidebarNav />
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <Header />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-transparent">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
