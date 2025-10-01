'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  Inbox,
  LayoutDashboard,
  MessageCircle,
  Calendar,
  Settings,
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
    { href: '/emails', labelKey: 'inbox', icon: <Inbox /> },
    { href: '/dashboard', labelKey: 'dashboard', icon: <LayoutDashboard /> },
    { href: '/chat', labelKey: 'chat', icon: <MessageCircle /> },
    { href: '/calendar', labelKey: 'calendar', icon: <Calendar /> },
  ];

  const settingsNav: NavItem = {
    href: '/settings',
    labelKey: 'settings',
    icon: <Settings />,
  };

  const isActive = (href: string) => {
    return pathname.startsWith(href);
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
