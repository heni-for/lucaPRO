'use client';

import { useApp } from '@/hooks/use-app';
import { Card, CardContent } from '@/components/ui/card';
import { Bell } from 'lucide-react';

export default function RemindersPage() {
  const { t } = useApp();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{t('reminders')}</h1>
      <Card className="bg-card">
        <CardContent className="flex flex-col items-center justify-center gap-4 text-center h-80">
          <Bell className="w-16 h-16 text-muted-foreground" />
          <h3 className="text-2xl font-bold tracking-tight">No Reminders</h3>
          <p className="text-sm text-muted-foreground">
            Create reminders or ask Luca to set one for you.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
