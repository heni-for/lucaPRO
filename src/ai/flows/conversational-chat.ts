'use server';
/**
 * @fileOverview A conversational AI agent that maintains history and responds in Derja.
 *
 * - continueConversation - A function that handles the conversation.
 * - ConversationInput - The input type for the continueConversation function.
 * - ConversationOutput - The return type for the continueConversation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatMessageSchema = z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
});

const ConversationInputSchema = z.object({
  history: z.array(ChatMessageSchema).describe('The conversation history.'),
});
export type ConversationInput = z.infer<typeof ConversationInputSchema>;

const ConversationOutputSchema = z.object({
  reply: z.string().describe('The AI-generated reply in Derja.'),
});
export type ConversationOutput = z.infer<typeof ConversationOutputSchema>;

export async function continueConversation(input: ConversationInput): Promise<ConversationOutput> {
  return conversationalChatFlow(input);
}

const conversationalChatFlow = ai.defineFlow(
  {
    name: 'conversationalChatFlow',
    inputSchema: ConversationInputSchema,
    outputSchema: ConversationOutputSchema,
  },
  async ({history}) => {
    
    const { text } = await ai.generate({
        system: 'You are an AI assistant named Luca. You MUST reply exclusively in Tunisian Derja. Do not use any other language.',
        history: history.map(m => ({...m, content: [{text: m.content}]})),
        prompt: ''
    });

    return {
        reply: text
    };
  }
);
