import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { SlidersHorizontal } from 'lucide-react';

export default function SettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Configuration</CardTitle>
        <CardDescription>Manage settings for AI models and processing parameters.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4 text-center h-96">
        <SlidersHorizontal className="w-16 h-16 text-muted-foreground" />
        <p className="text-lg font-semibold">Configuration Page Coming Soon!</p>
        <p className="text-sm text-muted-foreground">
          This is where you'll be able to manage model settings, processing parameters, and more.
        </p>
      </CardContent>
    </Card>
  );
}
