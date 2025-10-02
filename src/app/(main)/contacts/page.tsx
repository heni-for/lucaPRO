'use client';

import { useApp } from '@/hooks/use-app';
import { Card, CardContent } from '@/components/ui/card';
import { Contact } from 'lucide-react';

export default function ContactsPage() {
  const { t } = useApp();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{t('contacts')}</h1>
      <Card className="bg-card">
        <CardContent className="flex flex-col items-center justify-center gap-4 text-center h-80">
          <Contact className="w-16 h-16 text-muted-foreground" />
          <h3 className="text-2xl font-bold tracking-tight">Your address book is empty</h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            As you mention people in conversations, Luca will help you build your contact list here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
