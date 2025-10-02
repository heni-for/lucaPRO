'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Clock, Users, ArrowRight, Calendar, MessageCircle } from 'lucide-react';
import { useApp } from '@/hooks/use-app';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { planningItems as mockPlanningItems } from '@/lib/data';
import type { PlanningItem } from '@/lib/types';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

export default function DashboardPage() {
    const { t, dir } = useApp();
    const today = new Date().toISOString().split('T')[0];
    const todaysEvents = mockPlanningItems.filter(item => item.date === today);

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4" dir={dir}>
        <div className="lg:col-span-4">
            <h1 className="text-3xl font-bold">Welcome back!</h1>
            <p className="text-muted-foreground">Here's a summary of your day with Luca.</p>
        </div>

        <Card className="lg:col-span-2 bg-card">
            <CardHeader className='flex-row items-center justify-between'>
                <div>
                    <CardTitle>{t('chat')}</CardTitle>
                    <CardDescription>{t('chat_description')}</CardDescription>
                </div>
                 <Button asChild variant="outline" size="icon">
                    <Link href="/chat">
                        <MessageCircle className="h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Your recent conversations with Luca will appear here.</p>
                 <Button asChild variant="secondary">
                    <Link href="/chat">
                        Start a Conversation <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-card">
            <CardHeader className='flex-row items-center justify-between'>
                <div>
                    <CardTitle>{t('calendar')}</CardTitle>
                    <CardDescription>Your upcoming events for today.</CardDescription>
                </div>
                 <Button asChild variant="outline" size="icon">
                    <Link href="/agenda">
                        <Calendar className="h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                {todaysEvents.length > 0 ? (
                    <div className="space-y-4">
                        {todaysEvents.map(item => (
                            <div key={item.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                                <div>
                                    <p className="font-semibold">{item.title}</p>
                                    <p className="text-sm text-muted-foreground">{item.time}</p>
                                </div>
                                <Badge variant="secondary">{item.status}</Badge>
                            </div>
                        ))}
                    </div>
                ): (
                     <p className="text-sm text-muted-foreground">You have no events scheduled for today.</p>
                )}
            </CardContent>
        </Card>

        <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('reminders')}</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">{mockPlanningItems.length}</div>
            <p className="text-xs text-muted-foreground">
                total upcoming reminders
            </p>
            </CardContent>
        </Card>
        
        <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('contacts')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
                people in your contacts
            </p>
            </CardContent>
        </Card>

         <Card className="lg:col-span-4 bg-card">
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Some suggestions to get started with Luca.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                 <Button variant="secondary">Add a medicine reminder</Button>
                 <Button variant="secondary">Show my meetings for tomorrow</Button>
                 <Button variant="secondary">Summarize my last email</Button>
            </CardContent>
      </Card>
    </div>
  );
}
