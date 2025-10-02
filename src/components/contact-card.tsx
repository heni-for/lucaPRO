'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User, Calendar, Tag, Trash2, Edit } from 'lucide-react';
import { format } from 'date-fns';

type Contact = {
    name: string;
    firstMentionDate: string;
    relation: string;
};

interface ContactCardProps {
  contact: Contact;
}

export function ContactCard({ contact }: ContactCardProps) {
  return (
    <Card className="bg-card flex flex-col">
      <CardHeader className="flex-row items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
            <CardTitle>{contact.name}</CardTitle>
            <CardDescription>First mentioned on {format(new Date(contact.firstMentionDate), 'PPP')}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-2">
         <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Tag className="h-4 w-4" />
            <span>Relation: {contact.relation}</span>
         </div>
      </CardContent>
      <CardFooter className="p-2 justify-end gap-2 border-t mt-4">
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
          <span className="sr-only">Edit Contact</span>
        </Button>
        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete Contact</span>
        </Button>
         <Button variant="secondary" size="sm">Save to Address Book</Button>
      </CardFooter>
    </Card>
  );
}
