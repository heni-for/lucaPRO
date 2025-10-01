'use server';
/**
 * @fileOverview A conversational AI agent that maintains history.
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
  reply: z.string().describe('The AI-generated reply.'),
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
    const chat = ai.getHistory();
    for (const message of history) {
        if (message.role === 'user') {
            await chat.addUserMessage(message.content);
        } else {
            await chat.addModelMessage(message.content);
        }
    }
    
    const {output} = await chat.send();

    return {
        reply: output as string
    };
  }
);
