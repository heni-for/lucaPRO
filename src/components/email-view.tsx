'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { getSummaryAction, textToSpeechAction } from '@/app/actions/chatActions';
import { useApp } from '@/hooks/use-app';
import type { Email } from '@/lib/types';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ArrowLeft,
  Archive,
  Clock,
  Forward,
  Reply,
  ReplyAll,
  Trash2,
  Sparkles,
  PenSquare,
  Volume2,
  Loader,
} from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface EmailViewProps {
  email: Email;
  onDraftReply: () => void;
}

export function EmailView({ email, onDraftReply }: EmailViewProps) {
  const { t } = useApp();
  const { toast } = useToast();
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSummarize = async () => {
    setIsLoadingSummary(true);
    setSummary(null);
    const result = await getSummaryAction(email.body);
    if (result.summary) {
      setSummary(result.summary);
    } else {
      toast({
        variant: 'destructive',
        title: t('summary_error'),
        description: result.error,
      });
    }
    setIsLoadingSummary(false);
  };
  
  const handleTextToSpeech = async () => {
    if (!summary) return;
    setIsLoadingAudio(true);
    const result = await textToSpeechAction(summary);
    setIsLoadingAudio(false);

    if (result.audioUrl) {
      if (audioRef.current) {
        audioRef.current.src = result.audioUrl;
        audioRef.current.play();
      }
    } else {
       toast({
        variant: 'destructive',
        title: 'Audio Error',
        description: result.error || 'Failed to generate audio.',
      });
    }
  };


  return (
    <div className="flex flex-1 flex-col">
       <audio ref={audioRef} className="hidden" />
      <div className="flex items-center p-2 gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/emails">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">{t('back_to_inbox')}</span>
          </Link>
        </Button>
        <div className="flex gap-1 ml-auto">
            <Button variant="outline" size="icon">
                <Archive className="h-4 w-4" />
                <span className="sr-only">Archive</span>
            </Button>
            <Button variant="outline" size="icon">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Trash</span>
            </Button>
        </div>
      </div>
      <Separator />
      <div className="flex-1 overflow-auto p-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={email.from.avatar} alt={email.from.name} />
            <AvatarFallback>
              {email.from.name.split(' ').map((n) => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="font-semibold">{email.from.name}</p>
            <p className="text-sm text-muted-foreground">{email.from.email}</p>
          </div>
          <div className="ml-auto text-xs text-muted-foreground flex items-center gap-2">
            <Clock className="h-3.5 w-3.5" />
            {format(new Date(email.receivedDate), 'PPpp')}
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-2">
            <h1 className="text-2xl font-bold">{email.subject}</h1>
            <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: email.body }} />
        </div>
        <Separator className="my-4" />
        <div className="flex items-center gap-2">
            <Button variant="outline"><Reply className="mr-2 h-4 w-4" />Reply</Button>
            <Button variant="outline"><ReplyAll className="mr-2 h-4 w-4" />Reply All</Button>
            <Button variant="outline"><Forward className="mr-2 h-4 w-4" />Forward</Button>
            <div className='ml-auto flex items-center gap-2'>
              <Button onClick={onDraftReply} variant="outline">
                <PenSquare className="mr-2 h-4 w-4" />
                {t('help_draft_reply')}
              </Button>
              <Button onClick={handleSummarize} disabled={isLoadingSummary} className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Sparkles className="mr-2 h-4 w-4" />
                {t('summarize_derja')}
              </Button>
            </div>
        </div>

        {(isLoadingSummary || summary) && (
          <Card className="mt-6" dir="rtl">
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle>{t('summary')}</CardTitle>
                <CardDescription>{t('summary_description')}</CardDescription>
              </div>
              {summary && !isLoadingSummary && (
                <Button onClick={handleTextToSpeech} disabled={isLoadingAudio} variant="outline" size="icon">
                  {isLoadingAudio ? <Loader className="h-4 w-4 animate-spin" /> : <Volume2 className="h-4 w-4" />}
                  <span className="sr-only">Read summary aloud</span>
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {isLoadingSummary ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ) : (
                <p className="text-sm font-medium leading-relaxed">{summary}</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
