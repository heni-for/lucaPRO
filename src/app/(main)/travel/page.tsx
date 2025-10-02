'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Plane, Map, Globe } from 'lucide-react';
import { useApp } from '@/hooks/use-app';

export default function TravelJournalPage() {
  const { t } = useApp();

  return (
    <div className="grid gap-6">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{t('travel_journal')}</h1>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                {t('add_trip')}
            </Button>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>{t('upcoming_trips')}</CardTitle>
          <CardDescription>{t('upcoming_trips_description')}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4 text-center h-48">
            <Plane className="w-12 h-12 text-muted-foreground" />
            <p className="text-lg font-semibold">{t('no_upcoming_trips')}</p>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                {t('no_upcoming_trips_description')}
            </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('past_destinations')}</CardTitle>
          <CardDescription>{t('past_destinations_description')}</CardDescription>
        </CardHeader>
         <CardContent className="flex flex-col items-center justify-center gap-4 text-center h-48">
            <Globe className="w-12 h-12 text-muted-foreground" />
            <p className="text-lg font-semibold">{t('no_past_destinations')}</p>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                {t('no_past_destinations_description')}
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
