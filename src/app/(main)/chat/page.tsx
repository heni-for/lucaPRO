import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BotMessageSquare } from 'lucide-react';

export default function ChatPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversational AI</CardTitle>
        <CardDescription>Interact with Luca using a natural language interface.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4 text-center h-96">
        <BotMessageSquare className="w-16 h-16 text-muted-foreground" />
        <p className="text-lg font-semibold">Chat Interface Coming Soon!</p>
        <p className="text-sm text-muted-foreground">
          Soon you'll be able to ask Luca questions about your emails, agenda, and more in Derja or English.
        </p>
      </CardContent>
    </Card>
  );
}
