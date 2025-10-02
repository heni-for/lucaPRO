'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, ShoppingCart, ListChecks, Heart } from 'lucide-react';
import { useApp } from '@/hooks/use-app';

export default function ShoppingPage() {
  const { t } = useApp();

  return (
    <div className="grid gap-6">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{t('shopping_wish_list')}</h1>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                {t('add_item')}
            </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
            <CardHeader>
            <CardTitle>{t('shopping_list')}</CardTitle>
            <CardDescription>{t('shopping_list_description')}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-4 text-center h-60">
                <ListChecks className="w-16 h-16 text-muted-foreground" />
                <h3 className="text-xl font-bold tracking-tight">{t('shopping_list_empty')}</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                    {t('shopping_list_empty_description')}
                </p>
            </CardContent>
        </Card>

         <Card>
            <CardHeader>
            <CardTitle>{t('wish_list')}</CardTitle>
            <CardDescription>{t('wish_list_description')}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-4 text-center h-60">
                <Heart className="w-16 h-16 text-muted-foreground" />
                <h3 className="text-xl font-bold tracking-tight">{t('wish_list_empty')}</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                    {t('wish_list_empty_description')}
                </p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
