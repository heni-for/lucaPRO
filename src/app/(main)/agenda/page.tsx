'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import type { PlanningItem } from '@/lib/types';
import { PlusCircle, Calendar as CalendarIcon, Clock, MapPin, Users, Package, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { useApp } from '@/hooks/use-app';
import { planningItems as mockPlanningItems } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function AgendaPage() {
  const { t } = useApp();
  const [planningItems, setPlanningItems] = useState<PlanningItem[]>(mockPlanningItems);

  const getStatusVariant = (status: PlanningItem['status']) => {
    switch (status) {
      case 'Confirmed':
        return 'default';
      case 'Planned':
        return 'secondary';
      case 'Canceled':
        return 'destructive';
      case 'Done':
        return 'outline';
      default:
        return 'secondary';
    }
  };

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
            .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime())
            .map((item) => (
            <Card key={item.id} className="bg-card flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>{item.title}</CardTitle>
                    <Badge variant={getStatusVariant(item.status)}>{item.status}</Badge>
                </div>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm flex-1">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span>{format(new Date(`${item.date}T00:00:00`), 'PPP')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{item.time}</span>
                </div>
                {item.place && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{item.place}</span>
                  </div>
                )}
                 {item.people && item.people.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{item.people.join(', ')}</span>
                  </div>
                )}
                {item.items && item.items.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="italic">{`Bring: ${item.items.join(', ')}`}</span>
                  </div>
                )}
                 <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground">
                    <AlertTriangle className="h-3 w-3" />
                    <span>{`Reminder at ${item.reminder_time}`}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
