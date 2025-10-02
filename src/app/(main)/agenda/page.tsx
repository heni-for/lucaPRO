'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import type { PlanningItem } from '@/lib/types';
import { PlusCircle, Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { useApp } from '@/hooks/use-app';

export default function AgendaPage() {
  const { t } = useApp();
  const [planningItems, setPlanningItems] = useState<PlanningItem[]>([]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('calendar')}</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          {t('add_event')}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {planningItems.length === 0 ? (
          <Card className="md:col-span-2 lg:col-span-3 bg-card">
            <CardContent className="flex flex-col items-center justify-center gap-4 text-center h-80">
              <CalendarIcon className="w-16 h-16 text-muted-foreground" />
              <p className="text-lg font-semibold">{t('no_events')}</p>
              <p className="text-sm text-muted-foreground">{t('no_events_description')}</p>
            </CardContent>
          </Card>
        ) : (
          planningItems
            .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
            .map((item) => (
            <Card key={item.id} className="bg-card">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span>{format(new Date(item.startTime), 'PPP')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{format(new Date(item.startTime), 'p')} - {format(new Date(item.endTime), 'p')}</span>
                </div>
                {item.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{item.location}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
