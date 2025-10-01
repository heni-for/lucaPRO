'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Email } from '@/lib/types';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { useApp } from '@/hooks/use-app';
import { Inbox } from 'lucide-react';

interface EmailListProps {
  emails: Email[];
}

export function EmailList({ emails }: EmailListProps) {
  const { t } = useApp();

  if (emails.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 text-center h-80">
        <Inbox className="w-16 h-16 text-muted-foreground" />
        <h3 className="text-2xl font-bold tracking-tight">{t('no_emails_found')}</h3>
        <p className="text-sm text-muted-foreground">{t('no_emails_found_description')}</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border">
      {emails.map((email) => (
        <Link
          key={email.id}
          href={`/emails/${email.id}`}
          className={cn(
            'flex flex-col items-start gap-2 rounded-lg p-3 text-left text-sm transition-all hover:bg-accent/50',
            !email.isRead && 'bg-primary/5'
          )}
        >
          <div className="flex w-full items-center gap-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src={email.from.avatar} alt={email.from.name} />
              <AvatarFallback>
                {email.from.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className={cn('font-semibold', !email.isRead && 'text-primary')}>
                  {email.from.name}
                </p>
                <p className={cn(
                  'text-xs text-muted-foreground',
                  !email.isRead && 'font-medium text-foreground'
                )}>
                  {formatDistanceToNow(new Date(email.receivedDate), { addSuffix: true })}
                </p>
              </div>
              <p className={cn('text-sm font-medium', !email.isRead && 'text-primary/90')}>
                {email.subject}
              </p>
            </div>
          </div>
          <div className="line-clamp-2 text-xs text-muted-foreground">
            {email.snippet}
          </div>
        </Link>
      ))}
    </div>
  );
}
