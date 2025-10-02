'use client';

import { useApp } from '@/hooks/use-app';
import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';

export default function ContactsPage() {
  const { t } = useApp();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{t('contacts')}</h1>
      <Card className="bg-background/80 backdrop-blur-sm">
        <CardContent className="flex flex-col items-center justify-center gap-4 text-center h-80">
          <Users className="w-16 h-16 text-muted-foreground" />
          <h3 className="text-2xl font-bold tracking-tight">No Contacts Yet</h3>
          <p className="text-sm text-muted-foreground">
            Luca will learn about people from your conversations.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
