'use client';

import { useState } from 'react';
import { useApp } from '@/hooks/use-app';
import { emails as initialEmails } from '@/lib/data';
import type { Email } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PlusCircle, ListFilter } from 'lucide-react';
import { NewEmailForm } from '@/components/new-email-form';
import { EmailList } from '@/components/email-list';

type FilterStatus = 'all' | 'read' | 'unread';

export default function EmailsPage() {
  const { t } = useApp();
  const [emails, setEmails] = useState<Email[]>(initialEmails);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const handleEmailCreated = (newEmail: Email) => {
    setEmails((prevEmails) => [newEmail, ...prevEmails]);
    setCreateModalOpen(false);
  };

  const filteredEmails = emails
    .filter((email) => {
      const query = searchQuery.toLowerCase();
      return (
        email.subject.toLowerCase().includes(query) ||
        email.from.name.toLowerCase().includes(query) ||
        email.snippet.toLowerCase().includes(query)
      );
    })
    .filter((email) => {
      if (filterStatus === 'read') return email.isRead;
      if (filterStatus === 'unread') return !email.isRead;
      return true;
    })
    .sort((a, b) => new Date(b.receivedDate).getTime() - new Date(a.receivedDate).getTime());

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  {t('filter_by_status')}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t('filter_by_status')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => setFilterStatus('all')}>{t('all')}</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setFilterStatus('unread')}>{t('unread')}</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setFilterStatus('read')}>{t('read')}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" className="h-8 gap-1" onClick={() => setCreateModalOpen(true)}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              {t('compose')}
            </span>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t('inbox')}</CardTitle>
          <CardDescription>
            {t('inbox')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmailList emails={filteredEmails} />
        </CardContent>
      </Card>
      <NewEmailForm
        isOpen={isCreateModalOpen}
        onOpenChange={setCreateModalOpen}
        onEmailCreated={handleEmailCreated}
      />
    </>
  );
}
