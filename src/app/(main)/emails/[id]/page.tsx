'use client';
import { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { EmailView } from '@/components/email-view';
import { emails as initialEmails } from '@/lib/data';
import type { Email } from '@/lib/types';
import { HelpReplyDialog } from '@/components/help-reply-dialog';

export default function EmailPage() {
  const params = useParams<{ id: string }>();
  const [emails, setEmails] = useState(initialEmails);
  const [isReplyDialogOpen, setReplyDialogOpen] = useState(false);
  
  const email = emails.find((e) => e.id === params.id);

  if (!email) {
    notFound();
  }

  // Mark email as read
  if (!email.isRead) {
    setEmails(currentEmails => currentEmails.map(e => e.id === email.id ? {...e, isRead: true} : e));
  }

  return (
    <>
      <EmailView email={email} onDraftReply={() => setReplyDialogOpen(true)} />
      <HelpReplyDialog 
        isOpen={isReplyDialogOpen}
        onOpenChange={setReplyDialogOpen}
        emailBody={email.body}
      />
    </>
  );
}
