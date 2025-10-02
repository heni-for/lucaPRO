'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Edit, HeartHandshake, Home, Pill, User, Zap } from 'lucide-react';
import { useApp } from '@/hooks/use-app';
import { Badge } from '@/components/ui/badge';

const memoryData = {
    people: [
        { name: 'Asmaani', relation: 'Colleague', notes: 'Met 5 times this month' },
        { name: 'Ahmed', relation: 'Friend', notes: 'Going to Sousse together' },
    ],
    habits: [
        { name: 'Morning Coffee', frequency: 'Daily', notes: 'User usually starts the day with coffee.'},
        { name: 'Gym Session', frequency: '3 times/week', notes: 'Prefers evening workouts.' },
    ],
    health: [
        { name: 'Diabetes Medicine', time: '20:00 Daily', notes: 'Essential daily medication.' },
    ],
    notes: [
        'User prefers reminders 30 minutes before events.',
        'Favorite coffee spot is in Lac.',
        'Has an exam at ESPRIT next week.',
    ]
};


export default function MemoryPage() {
  const { t } = useApp();

  return (
    <div className="grid gap-6">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{t('memory')}</h1>
            <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Manage Memory
            </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <User className="h-6 w-6 text-primary" />
                    <CardTitle>{t('contacts')}</CardTitle>
                </div>
                <CardDescription>People Luca remembers in your circle.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                {memoryData.people.map(person => (
                     <div key={person.name} className="flex items-start justify-between p-3 rounded-lg bg-muted/50">
                        <div>
                            <p className="font-semibold">{person.name}</p>
                            <p className="text-sm text-muted-foreground">{person.notes}</p>
                        </div>
                        <Badge variant="secondary">{person.relation}</Badge>
                    </div>
                ))}
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                 <div className="flex items-center gap-3">
                    <Zap className="h-6 w-6 text-primary" />
                    <CardTitle>{t('habits')}</CardTitle>
                </div>
                <CardDescription>Recurring activities and routines Luca has learned.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                {memoryData.habits.map(habit => (
                     <div key={habit.name} className="flex items-start justify-between p-3 rounded-lg bg-muted/50">
                        <div>
                            <p className="font-semibold">{habit.name}</p>
                            <p className="text-sm text-muted-foreground">{habit.notes}</p>
                        </div>
                        <Badge variant="outline">{habit.frequency}</Badge>
                    </div>
                ))}
            </CardContent>
        </Card>

         <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Pill className="h-6 w-6 text-primary" />
                    <CardTitle>{t('health_habits')}</CardTitle>
                </div>
                <CardDescription>Important health information and medication schedules.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                {memoryData.health.map(item => (
                    <div key={item.name} className="flex items-start justify-between p-3 rounded-lg bg-muted/50">
                        <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.notes}</p>
                        </div>
                        <Badge variant="destructive">{item.time}</Badge>
                    </div>
                ))}
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Brain className="h-6 w-6 text-primary" />
                    <CardTitle>{t('notes_knowledge')}</CardTitle>
                </div>
                <CardDescription>General information and preferences Luca has saved.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="list-disc list-inside space-y-2 text-sm text-foreground">
                    {memoryData.notes.map((note, index) => (
                        <li key={index}>{note}</li>
                    ))}
                </ul>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
