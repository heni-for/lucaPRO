'use client';

import { useApp } from '@/hooks/use-app';
import { Card, CardContent } from '@/components/ui/card';
import { Contact, UserPlus } from 'lucide-react';
import { planningItems } from '@/lib/data';
import { ContactCard } from '@/components/contact-card';
import { Button } from '@/components/ui/button';

export default function ContactsPage() {
  const { t } = useApp();

  const contacts = Array.from(new Set(planningItems.flatMap(item => item.people || [])))
    .map(name => {
      const firstMention = planningItems.find(item => item.people?.includes(name));
      return {
        name,
        firstMentionDate: firstMention?.created_at || firstMention?.date || new Date().toISOString(),
        relation: firstMention?.category === 'Work' ? 'Work' : 'Personal', 
      };
    });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('contacts')}</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Contact
        </Button>
      </div>

      {contacts.length === 0 ? (
        <Card className="bg-card">
          <CardContent className="flex flex-col items-center justify-center gap-4 text-center h-80">
            <Contact className="w-16 h-16 text-muted-foreground" />
            <h3 className="text-2xl font-bold tracking-tight">Your address book is empty</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              As you mention people in conversations, Luca will help you build your contact list here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {contacts.map(contact => (
            <ContactCard key={contact.name} contact={contact} />
          ))}
        </div>
      )}
    </div>
  );
}
