'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Pill, HeartPulse, Stethoscope, Droplets } from 'lucide-react';
import { useApp } from '@/hooks/use-app';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

const medicineReminders = [
    { id: 1, name: 'Diabetes Medicine', time: '20:00', dosage: '1 tablet' },
    { id: 2, name: 'Vitamin D', time: '08:00', dosage: '2 drops' },
];

const habits = [
    { id: 1, name: 'Drink Water', goal: '2L/day', icon: <Droplets className="h-5 w-5" /> },
    { id: 2, name: 'Gym Session', goal: '3 times/week', icon: <HeartPulse className="h-5 w-5" /> },
];


export default function HealthPage() {
  const { t } = useApp();

  return (
    <div className="grid gap-6">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{t('health_habits')}</h1>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                {t('add_health_task')}
            </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('medicine_reminders')}</CardTitle>
          <CardDescription>{t('medicine_reminders_description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {medicineReminders.map(med => (
                 <div key={med.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-4">
                        <Pill className="h-6 w-6 text-primary" />
                        <div>
                            <p className="font-semibold">{med.name}</p>
                            <p className="text-sm text-muted-foreground">Dosage: {med.dosage}</p>
                        </div>
                    </div>
                    <Badge variant="secondary">at {med.time}</Badge>
                </div>
            ))}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('habit_tracker')}</CardTitle>
          <CardDescription>{t('habit_tracker_description')}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
            {habits.map(habit => (
                <div key={habit.id} className="flex items-center gap-4 p-4 rounded-lg border">
                    {habit.icon}
                    <div>
                        <p className="font-semibold">{habit.name}</p>
                        <p className="text-sm text-muted-foreground">{habit.goal}</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">Track</Button>
                </div>
            ))}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('health_notes')}</CardTitle>
          <CardDescription>{t('health_notes_description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <Textarea placeholder="e.g., I'm feeling tired today..." />
            <Button>{t('save_note')}</Button>
        </CardContent>
      </Card>

    </div>
  );
}
