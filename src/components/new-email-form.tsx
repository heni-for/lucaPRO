'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useApp } from '@/hooks/use-app';
import { useToast } from '@/hooks/use-toast';
import type { Email } from '@/lib/types';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  to: z.string().email({ message: 'Invalid email address.' }),
  subject: z.string().min(2, { message: 'Subject must be at least 2 characters.' }),
  body: z.string().min(10, { message: 'Body must be at least 10 characters.' }),
});

interface NewEmailFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onEmailCreated: (email: Email) => void;
}

export function NewEmailForm({ isOpen, onOpenChange, onEmailCreated }: NewEmailFormProps) {
  const { t } = useApp();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      to: '',
      subject: '',
      body: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newEmail: Email = {
      id: new Date().getTime().toString(),
      from: {
        name: 'Me',
        email: 'me@derjamail.com',
        avatar: 'https://i.pravatar.cc/40?u=me',
      },
      to: values.to,
      subject: values.subject,
      body: `<p>${values.body.replace(/\n/g, '</p><p>')}</p>`,
      snippet: values.body.substring(0, 100) + '...',
      isRead: true, // It's from us, so it's "read"
      receivedDate: new Date().toISOString(),
    };
    onEmailCreated(newEmail);
    toast({
      title: t('email_created_success'),
    });
    form.reset();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('create_mock_email')}</DialogTitle>
          <DialogDescription>{t('create_mock_email')}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('to')}</FormLabel>
                  <FormControl>
                    <Input placeholder="recipient@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('subject')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('subject')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('body')}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t('body')} className="min-h-[150px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                {t('cancel')}
              </Button>
              <Button type="submit">{t('save')}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
