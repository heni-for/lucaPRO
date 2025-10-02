'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, DollarSign, Receipt, CreditCard } from 'lucide-react';
import { useApp } from '@/hooks/use-app';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

export default function FinancePage() {
  const { t } = useApp();

  return (
    <div className="grid gap-6">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{t('finance')}</h1>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                {t('add_transaction')}
            </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('bills_due')}</CardTitle>
          <CardDescription>{t('bills_due_description')}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4 text-center h-48">
            <Receipt className="w-12 h-12 text-muted-foreground" />
            <p className="text-lg font-semibold">{t('no_bills_due')}</p>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                {t('no_bills_due_description')}
            </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('subscriptions')}</CardTitle>
          <CardDescription>{t('subscriptions_description')}</CardDescription>
        </CardHeader>
         <CardContent className="flex flex-col items-center justify-center gap-4 text-center h-48">
            <CreditCard className="w-12 h-12 text-muted-foreground" />
            <p className="text-lg font-semibold">{t('no_subscriptions')}</p>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                {t('no_subscriptions_description')}
            </p>
        </CardContent>
      </Card>
      
    </div>
  );
}
