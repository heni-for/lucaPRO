'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { BotMessageSquare, Send, User, Mic, Loader, Waves, Volume2 } from 'lucide-react';
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

const SpeechRecognition =
  typeof window !== 'undefined'
    ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    : undefined;


export default function ChatPage() {
    const { t, dir, language } = useApp();
    const { toast } = useToast();
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', content: "أهلاً بيك في لوكا! كيفاش نجم نعاونك اليوم؟" }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [activeAudio, setActiveAudio] = useState<string | null>(null); // To track which message audio is playing
    
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
    
    const playAudio = async (text: string, messageId: string) => {
        if (activeAudio === messageId) {
            audioRef.current?.pause();
            audioRef.current?.currentTime && (audioRef.current.currentTime = 0);
            setActiveAudio(null);
            return;
        }

        setActiveAudio(messageId);
        const result = await textToSpeechAction(text);

        if (result.audioUrl && audioRef.current) {
            audioRef.current.src = result.audioUrl;
            audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
        } else if(result.error) {
             toast({ variant: 'destructive', title: 'Audio Error', description: result.error });
             setActiveAudio(null);
        }
    }


    const handleSendMessage = async (values: z.infer<typeof formSchema>) => {
        const userPrompt = values.prompt;
        if (!userPrompt) return;
        
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
        recognition.continuous = false; // Stop after first final result
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
          let finalTranscript = '';
          let interimTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }
          
          form.setValue('prompt', finalTranscript || interimTranscript);
    
          if (finalTranscript) {
             form.setValue('prompt', finalTranscript);
             form.handleSubmit(handleSendMessage)();
             recognition.stop();
          }
        };
    
        recognition.start();
      };
      
      useEffect(() => {
        if (audioRef.current) {
            audioRef.current.onended = () => setActiveAudio(null);
        }
        // Cleanup recognition on component unmount
        return () => {
          recognitionRef.current?.abort();
        };
      }, []);


  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-8rem)]">
        <audio ref={audioRef} className="hidden" />
        <Card className="flex flex-col flex-1 bg-background/80 backdrop-blur-sm" dir={dir}>
        <CardHeader className="flex-row items-center">
            <div className='flex-1'>
                <CardTitle>{t('chat')}</CardTitle>
                <CardDescription>{t('chat_description')}</CardDescription>
            </div>
             {isListening && (
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Waves className="h-5 w-5 text-primary animate-pulse" />
                    <span className="text-xs font-medium">Listening...</span>
                </div>
            )}
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
            <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
                 <div className="space-y-6">
                    {messages.map((message, index) => {
                        const messageId = `msg-${index}`;
                        return (
                        <div key={index} className={cn('flex items-start gap-3', message.role === 'user' ? 'justify-end' : '')}>
                            {message.role === 'model' && (
                                <Avatar className="h-8 w-8 border">
                                    <AvatarFallback><BotMessageSquare/></AvatarFallback>
                                </Avatar>
                            )}
                            <div className={cn('rounded-lg px-4 py-3 max-w-[75%] relative group', message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                {message.role === 'model' && (
                                   <Button 
                                        size="icon" 
                                        variant="ghost" 
                                        className="absolute -bottom-4 -right-4 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => playAudio(message.content, messageId)}
                                    >
                                        {activeAudio === messageId ? <Loader className="h-3 w-3 animate-spin" /> : <Volume2 className="h-3 w-3" />}
                                    </Button>
                                )}
                            </div>
                            {message.role === 'user' && (
                                <Avatar className="h-8 w-8">
                                     <AvatarFallback><User /></AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    )})}
                    {isLoading && (
                       <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8 border">
                                <AvatarFallback><BotMessageSquare/></AvatarFallback>
                            </Avatar>
                            <div className="rounded-lg px-4 py-3 max-w-[75%] bg-muted w-48">
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-2/3" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>
        </CardContent>
        <CardFooter className="pt-4">
            <form onSubmit={form.handleSubmit(handleSendMessage)} className="flex w-full items-center space-x-2" dir='ltr'>
                <Button type="button" size="icon" variant={isListening ? 'destructive': 'outline'} onClick={handleToggleListening} disabled={isLoading}>
                    <Mic className="h-4 w-4" />
                    <span className="sr-only">Speak</span>
                </Button>
                <Input
                    {...form.register('prompt')}
                    placeholder={t('your_prompt_placeholder')} 
                    disabled={isLoading || isListening}
                    dir={dir}
                />
                <Button type="submit" size="icon" disabled={isLoading || isListening}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                </Button>
            </form>
        </CardFooter>
        </Card>
    </div>
  );
}
