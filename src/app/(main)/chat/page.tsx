'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { BotMessageSquare, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useApp } from '@/hooks/use-app';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
}

export default function ChatPage() {
    const { t } = useApp();
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Welcome to Luca! How can I help you with your emails or agenda today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() === '') return;

        const newUserMessage: Message = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, newUserMessage]);
        setInput('');

        // Mock bot response
        setTimeout(() => {
            const botResponse: Message = { id: Date.now() + 1, text: "This is a mock response. The real conversational AI is coming soon!", sender: 'bot' };
            setMessages(prev => [...prev, botResponse]);
        }, 1000);
    }

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-8rem)]">
        <Card className="flex flex-col flex-1">
        <CardHeader>
            <CardTitle>Conversational AI</CardTitle>
            <CardDescription>Interact with Luca using a natural language interface.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
            <ScrollArea className="h-full pr-4">
                 <div className="space-y-4">
                    {messages.map(message => (
                        <div key={message.id} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                            {message.sender === 'bot' && (
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback><BotMessageSquare/></AvatarFallback>
                                </Avatar>
                            )}
                            <div className={`rounded-lg px-4 py-2 max-w-[75%] ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                <p className="text-sm">{message.text}</p>
                            </div>
                            {message.sender === 'user' && (
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="https://i.pravatar.cc/40?u=user" alt="@user" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </CardContent>
        <CardFooter className="pt-4">
            <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
                <Input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t('your_prompt_placeholder')} 
                />
                <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                </Button>
            </form>
        </CardFooter>
        </Card>
    </div>
  );
}
