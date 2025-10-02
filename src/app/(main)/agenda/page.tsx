'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { PlanningItem } from '@/lib/types';
import { PlusCircle, Calendar as CalendarIcon } from 'lucide-react';
import { useApp } from '@/hooks/use-app';
import { planningItems as mockPlanningItems } from '@/lib/data';
import { EventCard } from '@/components/event-card';
import { EmptyCard } from '@/components/empty-card';
import { AddEventDialog } from '@/components/add-event-dialog';

export default function AgendaPage() {
  const { t } = useApp();
  const [planningItems, setPlanningItems] = useState<PlanningItem[]>(mockPlanningItems);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleStatusChange = (itemId: string, newStatus: PlanningItem['status']) => {
    // In a real app, this would call updateEventAction(itemId, { status: newStatus })
    setPlanningItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, status: newStatus } : item
      )
    );
  };
  
  const handleDelete = (itemId: string) => {
    // In a real app, this would call deleteEventAction(itemId)
    setPlanningItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };
  
  const handleEventCreated = (newEvent: Omit<PlanningItem, 'id' | 'source' | 'created_at'>) => {
     // In a real app, this would call createEventAction(newEvent)
    const eventWithId: PlanningItem = {
      ...newEvent,
      id: new Date().getTime().toString(),
      source: 'manual',
      status: 'Planned',
      created_at: new Date().toISOString(),
    };
    setPlanningItems(prevItems => [...prevItems, eventWithId]);
    setIsAddDialogOpen(false);
  };


  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t('calendar')}</h1>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            {t('add_event')}
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {planningItems.length === 0 ? (
            <div className="md:col-span-2 lg:col-span-3">
              <EmptyCard
                Icon={CalendarIcon}
                title={t('no_events')}
                description={t('no_events_description')}
              />
            </div>
          ) : (
            planningItems
              .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime())
              .map((item) => (
              <EventCard 
                key={item.id} 
                item={item} 
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
      <AddEventDialog 
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onEventCreated={handleEventCreated}
      />
    </>
  );
}
