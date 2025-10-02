'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  MessageCircle,
  Calendar,
  Users,
  Bell,
  Settings,
  HeartPulse,
  FileText,
  Brain,
  DollarSign,
  ShoppingCart,
  Briefcase,
  Plane,
  Music,
  FileArchive,
} from 'lucide-react';
import { useApp } from '@/hooks/use-app';
import type { TranslationKey } from '@/lib/translations';

type NavItem = {
  href: string;
  labelKey: TranslationKey;
  icon: React.ReactNode;
};

export function AppSidebarNav() {
  const pathname = usePathname();
  const { t } = useApp();

  const navItems: NavItem[] = [
    { href: '/dashboard', labelKey: 'dashboard', icon: <LayoutDashboard /> },
    { href: '/chat', labelKey: 'chat', icon: <MessageCircle /> },
    { href: '/agenda', labelKey: 'calendar', icon: <Calendar /> },
    { href: '/reminders', labelKey: 'reminders', icon: <Bell /> },
    { href: '/contacts', labelKey: 'contacts', icon: <Users /> },
    { href: '/memory', labelKey: 'memory', icon: <Brain /> },
    { href: '/health', labelKey: 'health_habits', icon: <HeartPulse /> },
    { href: '/finance', labelKey: 'finance', icon: <DollarSign /> },
    { href: '/shopping', labelKey: 'shopping_wish_list', icon: <ShoppingCart /> },
    { href: '/work', labelKey: 'work_school', icon: <Briefcase /> },
    { href: '/travel', labelKey: 'travel_journal', icon: <Plane /> },
    { href: '/media', labelKey: 'media_favorites', icon: <Music /> },
    { href: '/files', labelKey: 'files_docs', icon: <FileArchive /> },
    { href: '/notes', labelKey: 'notes_knowledge', icon: <FileText /> },
  ];

  const settingsNav: NavItem = {
    href: '/settings',
    labelKey: 'settings',
    icon: <Settings />,
  };

  const isActive = (href: string) => {
    // Exact match for dashboard, otherwise startsWith
    if (href === '/dashboard') {
      return pathname === href;
    }
    return pathname.startsWith(href) && href !== '/';
  };

  return (
    <div className="flex h-full flex-col">
      <SidebarMenu className="flex-1">
        {navItems.map((item) => (
          <SidebarMenuItem key={item.labelKey}>
            <SidebarMenuButton
              asChild
              isActive={isActive(item.href)}
              tooltip={t(item.labelKey)}
            >
              <Link href={item.href}>
                {item.icon}
                <span>{t(item.labelKey)}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={isActive(settingsNav.href)}
            tooltip={t(settingsNav.labelKey)}
          >
            <Link href={settingsNav.href}>
              {settingsNav.icon}
              <span>{t(settingsNav.labelKey)}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  );
}
