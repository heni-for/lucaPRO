import React from 'react';
import { Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Logo = ({ className }: { className?: string }) => (
  <div className={cn('flex items-center gap-2 text-sidebar-primary', className)}>
    <div className="rounded-lg bg-sidebar-primary p-2">
      <Mail className="size-6 text-sidebar-primary-foreground" />
    </div>
    <span className="text-xl font-bold font-headline text-sidebar-foreground">Luca</span>
  </div>
);
