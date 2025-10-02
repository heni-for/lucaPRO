'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Clock, Mail, Users, Star, MessageCircle, Calendar } from 'lucide-react';
import { useApp } from '@/hooks/use-app';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function DashboardPage() {
    const { t, dir } = useApp();
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4" dir={dir}>
        <div className="lg:col-span-4">
            <h1 className="text-3xl font-bold">Welcome back!</h1>
            <p className="text-muted-foreground">Here's a summary of your day with Luca.</p>
        </div>

        <Card className="lg:col-span-2 bg-card">
            <CardHeader>
                <CardTitle>{t('chat')}</CardTitle>
                <CardDescription>{t('chat_description')}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Your recent conversations with Luca will appear here.</p>
                 <Button asChild variant="outline">
                    <Link href="/chat">
                        Start a Conversation <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-card">
            <CardHeader>
                <CardTitle>{t('calendar')}</CardTitle>
                <CardDescription>Your upcoming events and appointments.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Today's events will be shown here.</p>
                 <Button asChild variant="outline">
                    <Link href="/agenda">
                        View Agenda <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardContent>
        </Card>

        <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('reminders')}</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
                upcoming reminders today
            </p>
            </CardContent>
        </Card>
        
        <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('contacts')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
                new people mentioned
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
