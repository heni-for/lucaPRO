import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Construction } from 'lucide-react';

export default function CalendarPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendar</CardTitle>
        <CardDescription>This page is under construction.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4 text-center h-80">
        <Construction className="w-16 h-16 text-muted-foreground" />
        <p className="text-lg font-semibold">Coming Soon!</p>
      </CardContent>
    </Card>
  );
}
