'use client';

import { useApp } from '@/hooks/use-app';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bell, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { planningItems } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default function RemindersPage() {
  const { t } = useApp();
  const sortedReminders = [...planningItems].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.reminder_time}`);
    const dateB = new Date(`${b.date}T${b.reminder_time}`);
    return dateA.getTime() - dateB.getTime();
  });


  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{t('reminders')}</h1>
      
      {sortedReminders.length === 0 ? (
         <Card className="bg-card">
            <CardContent className="flex flex-col items-center justify-center gap-4 text-center h-80">
            <Bell className="w-16 h-16 text-muted-foreground" />
            <h3 className="text-2xl font-bold tracking-tight">No Reminders</h3>
            <p className="text-sm text-muted-foreground">
                Create reminders or ask Luca to set one for you.
            </p>
            </CardContent>
         </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortedReminders.map(item => (
                <Card key={item.id} className="bg-card">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className='text-lg'>{item.title}</CardTitle>
                            <Badge variant={item.category === 'Health' ? 'destructive' : 'secondary'}>{item.category}</Badge>
                        </div>
                        <CardDescription>Reminder for your upcoming event.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                            <AlertTriangle className="h-6 w-6 text-primary" />
                            <div>
                               <p className="font-semibold">Reminds at {item.reminder_time}</p>
                               <p className="text-sm text-muted-foreground">on {format(new Date(`${item.date}T00:00:00`), 'PPP')}</p>
                            </div>
                        </div>
                         <div className="flex items-center gap-3 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>Event time: {item.time}</span>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">Snooze</Button>
                            <Button size="sm"><CheckCircle className="mr-2 h-4 w-4" /> Mark as Done</Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      )}
    </div>
  );
}
