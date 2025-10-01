import { emails } from '@/lib/data';
import type { Email } from '@/lib/types';
import { EmailView } from '@/components/email-view';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return emails.map((email) => ({
    id: email.id,
  }));
}

export default function EmailPage({ params }: { params: { id: string } }) {
  const email = emails.find((e) => e.id === params.id) as Email | undefined;

  if (!email) {
    notFound();
  }

  // Mark email as read (in a real app, this would be a DB update)
  email.isRead = true;

  return <EmailView email={email} />;
}
