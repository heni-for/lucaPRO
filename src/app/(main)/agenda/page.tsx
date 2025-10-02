'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import type { PlanningItem } from '@/lib/types';
import { PlusCircle, Calendar as CalendarIcon, Clock, MapPin, Users, Package, AlertTriangle, CheckCircle, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useApp } from '@/hooks/use-app';
import { planningItems as mockPlanningItems } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

export default function AgendaPage() {
  const { t } = useApp();
  const [planningItems, setPlanningItems] = useState<PlanningItem[]>(mockPlanningItems);

  const handleStatusChange = (itemId: string, newStatus: PlanningItem['status']) => {
    setPlanningItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, status: newStatus } : item
      )
    );
  };

  const handleDelete = (itemId: string) => {
    setPlanningItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };


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
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                {t('no_events_description')}
              </p>
            </CardContent>
          </Card>
        ) : (
          planningItems
            .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime())
            .map((item) => (
            <Card key={item.id} className="bg-card flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                    <CardTitle className="pr-4">{item.title}</CardTitle>
                    <Badge variant={getStatusVariant(item.status)}>{item.status}</Badge>
                </div>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 text-sm flex-1">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span>{format(new Date(`${item.date}T00:00:00`), 'PPP')} at {item.time}</span>
                </div>
                
                {item.place && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{item.place}</span>
                  </div>
                )}
                 {item.people && item.people.length > 0 && (
                  <div className="flex items-start gap-2">
                    <Users className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div className="flex flex-wrap gap-1">
                      {item.people.map(person => (
                        <Badge key={person} variant="secondary">{person}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {item.items && item.items.length > 0 && (
                  <div className="flex items-start gap-2">
                    <Package className="h-4 w-4 text-muted-foreground mt-0.5" />
                     <div className="flex flex-wrap gap-1">
                        {item.items.map(thing => (
                            <Badge key={thing} variant="outline" className="font-mono text-xs">{thing}</Badge>
                        ))}
                    </div>
                  </div>
                )}
                 <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground border-t border-dashed mt-2">
                    <AlertTriangle className="h-3 w-3" />
                    <span>{`Reminder at ${item.reminder_time}`}</span>
                </div>
              </CardContent>
              <Separator />
              <CardFooter className="p-2 justify-end gap-2">
                 <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                 </Button>
                 <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="h-4 w-4" />
                     <span className="sr-only">Delete</span>
                 </Button>
                 {item.status === 'Planned' && (
                    <Button variant="secondary" size="sm" className='ml-2' onClick={() => handleStatusChange(item.id, 'Confirmed')}>
                        <CheckCircle className="mr-2 h-4 w-4"/>
                        Confirm
                    </Button>
                 )}
                  {item.status === 'Confirmed' && new Date(`${item.date}T${item.time}`) < new Date() && (
                    <Button variant="default" size="sm" className='ml-2' onClick={() => handleStatusChange(item.id, 'Done')}>
                        <CheckCircle className="mr-2 h-4 w-4"/>
                        Mark as Done
                    </Button>
                 )}
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
