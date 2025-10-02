'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Music, Clapperboard, BookOpen } from 'lucide-react';
import { useApp } from '@/hooks/use-app';

export default function MediaPage() {
  const { t } = useApp();

  return (
    <div className="grid gap-6">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{t('media_favorites')}</h1>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                {t('add_favorite')}
            </Button>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>{t('music')}</CardTitle>
          <CardDescription>{t('music_description')}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4 text-center h-48">
            <Music className="w-12 h-12 text-muted-foreground" />
            <p className="text-lg font-semibold">{t('no_music')}</p>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
               {t('no_music_description')}
            </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('movies_series')}</CardTitle>
          <CardDescription>{t('movies_series_description')}</CardDescription>
        </CardHeader>
         <CardContent className="flex flex-col items-center justify-center gap-4 text-center h-48">
            <Clapperboard className="w-12 h-12 text-muted-foreground" />
            <p className="text-lg font-semibold">{t('no_movies_series')}</p>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
               {t('no_movies_series_description')}
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
