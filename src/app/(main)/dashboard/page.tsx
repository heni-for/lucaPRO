import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BarChart, Clock, Zap } from 'lucide-react';

export default function DashboardPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Analytics & Monitoring</CardTitle>
        <CardDescription>Performance tracking and business intelligence for the Luca AI platform.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4 text-center h-96">
        <div className="flex gap-8 text-muted-foreground">
            <BarChart className="w-16 h-16" />
            <Clock className="w-16 h-16" />
            <Zap className="w-16 h-16" />
        </div>
        <p className="text-lg font-semibold">Analytics Dashboard Coming Soon!</p>
        <p className="text-sm text-muted-foreground">
          This dashboard will provide insights into processing speed, accuracy metrics, and user engagement.
        </p>
      </CardContent>
    </Card>
  );
}
