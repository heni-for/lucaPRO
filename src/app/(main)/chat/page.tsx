'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { BotMessageSquare, Send, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useApp } from '@/hooks/use-app';
import { chatWithHistoryAction } from '@/app/actions';
import type { ChatMessage } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  prompt: z.string().min(1, 'Prompt cannot be empty.'),
});

export default function ChatPage() {
    const { t, dir } = useApp();
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', content: "أهلاً بيك في لوكا! كيفاش نجم نعاونك في إيميلاتك ولا في الأجندة متاعك اليوم؟" }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        prompt: '',
      },
    });

    const scrollToBottom = () => {
      if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div');
        if (viewport) {
          viewport.scrollTop = viewport.scrollHeight;
        }
      }
    };

    useEffect(() => {
      scrollToBottom();
    }, [messages, isLoading]);

    const handleSendMessage = async (values: z.infer<typeof formSchema>) => {
        const userPrompt = values.prompt;
        form.reset();

        const userMessage: ChatMessage = { role: 'user', content: userPrompt };
        const currentHistory = [...messages, userMessage];
        setMessages(currentHistory);
        setIsLoading(true);

        const result = await chatWithHistoryAction(currentHistory);
        setIsLoading(false);

        if (result.reply) {
            const botMessage: ChatMessage = { role: 'model', content: result.reply };
            setMessages(prev => [...prev, botMessage]);
        } else {
            const errorMessage: ChatMessage = { role: 'model', content: result.error || "عذراً، صارت مشكلة." };
            setMessages(prev => [...prev, errorMessage]);
        }
    }

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-8rem)]">
        <Card className="flex flex-col flex-1" dir={dir}>
        <CardHeader>
            <CardTitle>{t('chat')}</CardTitle>
            <CardDescription>تفاعل مع لوكا باستعمال لغة طبيعية.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
            <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
                 <div className="space-y-4">
                    {messages.map((message, index) => (
                        <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                            {message.role === 'model' && (
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback><BotMessageSquare/></AvatarFallback>
                                </Avatar>
                            )}
                            <div className={`rounded-lg px-4 py-2 max-w-[75%] ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                <p className="text-sm">{message.content}</p>
                            </div>
                            {message.role === 'user' && (
                                <Avatar className="h-8 w-8">
                                     <AvatarFallback><User /></AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                       <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback><BotMessageSquare/></AvatarFallback>
                            </Avatar>
                            <div className="rounded-lg px-4 py-2 max-w-[75%] bg-muted w-full">
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>
        </CardContent>
        <CardFooter className="pt-4">
            <form onSubmit={form.handleSubmit(handleSendMessage)} className="flex w-full items-center space-x-2">
                <Input
                    {...form.register('prompt')}
                    placeholder={t('your_prompt_placeholder')} 
                    disabled={isLoading}
                    dir={dir}
                />
                <Button type="submit" size="icon" disabled={isLoading}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                </Button>
            </form>
        </CardFooter>
        </Card>
    </div>
  );
}
