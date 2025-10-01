'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { BotMessageSquare, Send, User, Mic, Loader, Waves } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useApp } from '@/hooks/use-app';
import { chatWithHistoryAction, textToSpeechAction } from '@/app/actions';
import type { ChatMessage } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';


const formSchema = z.object({
  prompt: z.string().min(1, 'Prompt cannot be empty.'),
});

// A polyfill for the SpeechRecognition API
const SpeechRecognition =
  typeof window !== 'undefined'
    ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    : undefined;


export default function ChatPage() {
    const { t, dir, language } = useApp();
    const { toast } = useToast();
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', content: "أهلاً بيك في لوكا! كيفاش نجم نعاونك في إيميلاتك ولا في الأجندة متاعك اليوم؟" }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const recognitionRef = useRef<any>(null);


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
        if (!userPrompt) return;
        
        form.reset();

        const userMessage: ChatMessage = { role: 'user', content: userPrompt };
        const currentHistory = [...messages, userMessage];
        setMessages(currentHistory);
        setIsLoading(true);

        const result = await chatWithHistoryAction(currentHistory);
        
        if (result.reply) {
            const botMessage: ChatMessage = { role: 'model', content: result.reply };
            setMessages(prev => [...prev, botMessage]);
            // Convert bot's reply to speech
            setIsSpeaking(true);
            const audioResult = await textToSpeechAction(result.reply);
            setIsSpeaking(false);

            if (audioResult.audioUrl && audioRef.current) {
                audioRef.current.src = audioResult.audioUrl;
                audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
            } else if(audioResult.error) {
                 toast({ variant: 'destructive', title: 'Audio Error', description: audioResult.error });
            }
        } else {
            const errorMessage: ChatMessage = { role: 'model', content: result.error || "عذراً، صارت مشكلة." };
            setMessages(prev => [...prev, errorMessage]);
        }
        setIsLoading(false);
    }
    
    const handleToggleListening = () => {
        if (isListening) {
          recognitionRef.current?.stop();
          return;
        }
    
        if (!SpeechRecognition) {
          toast({
            variant: 'destructive',
            title: 'Browser Not Supported',
            description: 'Your browser does not support the Speech Recognition API.',
          });
          return;
        }
    
        const recognition = new SpeechRecognition();
        recognition.lang = language === 'derja' ? 'ar-TN' : 'en-US';
        recognition.interimResults = true;
        recognitionRef.current = recognition;
    
        recognition.onstart = () => {
          setIsListening(true);
        };
    
        recognition.onend = () => {
          setIsListening(false);
        };
    
        recognition.onerror = (event: any) => {
          console.error('Speech recognition error', event.error);
          toast({ variant: 'destructive', title: 'Recognition Error', description: event.error });
          setIsListening(false);
        };
    
        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result) => result.transcript)
            .join('');
          
          form.setValue('prompt', transcript);
    
          if (event.results[0].isFinal) {
            form.handleSubmit(handleSendMessage)();
          }
        };
    
        recognition.start();
      };
      
      useEffect(() => {
        if (audioRef.current) {
            audioRef.current.onended = () => setIsSpeaking(false);
        }
        // Cleanup recognition on component unmount
        return () => {
          recognitionRef.current?.abort();
        };
      }, []);


  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-8rem)]">
        <audio ref={audioRef} className="hidden" />
        <Card className="flex flex-col flex-1" dir={dir}>
        <CardHeader className="flex-row items-center">
            <div className='flex-1'>
                <CardTitle>{t('chat')}</CardTitle>
                <CardDescription>{t('chat_description')}</CardDescription>
            </div>
             {(isListening || isSpeaking) && (
                <div className="flex items-center gap-2 text-muted-foreground">
                {isListening && <Waves className="h-5 w-5 text-primary animate-pulse" />}
                {isSpeaking && <Loader className="h-5 w-5 animate-spin" />}
                <span className="text-xs font-medium">
                    {isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : ''}
                </span>
                </div>
            )}
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
            <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
                 <div className="space-y-4">
                    {messages.map((message, index) => (
                        <div key={index} className={cn('flex items-start gap-3', message.role === 'user' ? 'justify-end' : '')}>
                            {message.role === 'model' && (
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback><BotMessageSquare/></AvatarFallback>
                                </Avatar>
                            )}
                            <div className={cn('rounded-lg px-4 py-2 max-w-[75%]', message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                                <p className="text-sm">{message.content}</p>
                            </div>
                            {message.role === 'user' && (
                                <Avatar className="h-8 w-8">
                                     <AvatarFallback><User /></AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    ))}
                    {isLoading && !isSpeaking && (
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
            <form onSubmit={form.handleSubmit(handleSendMessage)} className="flex w-full items-center space-x-2" dir='ltr'>
                <Button type="button" size="icon" variant={isListening ? 'destructive': 'outline'} onClick={handleToggleListening} disabled={isLoading || isSpeaking}>
                    <Mic className="h-4 w-4" />
                    <span className="sr-only">Speak</span>
                </Button>
                <Input
                    {...form.register('prompt')}
                    placeholder={t('your_prompt_placeholder')} 
                    disabled={isLoading || isListening || isSpeaking}
                    dir={dir}
                />
                <Button type="submit" size="icon" disabled={isLoading || isListening || isSpeaking}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                </Button>
            </form>
        </CardFooter>
        </Card>
    </div>
  );
}
