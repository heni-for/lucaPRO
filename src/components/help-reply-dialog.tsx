'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { draftReplyAction } from '@/app/actions/chatActions';
import { useApp } from '@/hooks/use-app';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import { PenSquare } from 'lucide-react';

const formSchema = z.object({
  userPrompt: z.string().min(2, { message: 'Prompt must be at least 2 characters.' }),
});

interface HelpReplyDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  emailBody: string;
}

export function HelpReplyDialog({ isOpen, onOpenChange, emailBody }: HelpReplyDialogProps) {
  const { t } = useApp();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [draft, setDraft] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userPrompt: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setDraft(null);
    const result = await draftReplyAction(emailBody, values.userPrompt);
    setIsLoading(false);

    if (result.reply) {
      setDraft(result.reply);
    } else {
      toast({
        variant: 'destructive',
        title: t('draft_reply_error'),
        description: result.error,
      });
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
      setDraft(null);
      setIsLoading(false);
    }
    onOpenChange(open);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{t('help_draft_reply')}</DialogTitle>
          <DialogDescription>{t('help_draft_reply_description')}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="userPrompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('your_prompt')}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t('your_prompt_placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <Button type="submit" disabled={isLoading}>
                <PenSquare className="mr-2 h-4 w-4" />
                {isLoading ? t('generating_reply') : t('generate_draft')}
            </Button>
          </form>
        </Form>
        
        {(isLoading || draft) && (
            <div className="mt-4 rounded-md border bg-muted/50 p-4">
                <h4 className="text-sm font-semibold mb-2">{t('suggested_reply')}</h4>
                {isLoading ? (
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                ) : (
                    <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{draft}</div>
                )}
            </div>
        )}

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
            {t('close')}
          </Button>
          <Button type="button" onClick={() => {
            if(draft) {
              navigator.clipboard.writeText(draft);
              toast({ title: t('reply_copied') });
            }
          }} disabled={!draft}>
            {t('copy_reply')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
