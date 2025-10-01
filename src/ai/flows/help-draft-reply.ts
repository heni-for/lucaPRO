'use server';

/**
 * @fileOverview AI-powered draft reply generator for emails.
 *
 * - draftReply - A function that generates an AI draft reply based on the email context.
 * - DraftReplyInput - The input type for the draftReply function.
 * - DraftReplyOutput - The return type for the draftReply function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DraftReplyInputSchema = z.object({
  emailBody: z.string().describe('The content of the email to reply to.'),
  userPrompt: z.string().describe('Any specific instructions or context from the user for the reply.'),
});
export type DraftReplyInput = z.infer<typeof DraftReplyInputSchema>;

const DraftReplyOutputSchema = z.object({
  draftReply: z.string().describe('The AI-generated draft reply.'),
});
export type DraftReplyOutput = z.infer<typeof DraftReplyOutputSchema>;

export async function draftReply(input: DraftReplyInput): Promise<DraftReplyOutput> {
  return draftReplyFlow(input);
}

const draftReplyPrompt = ai.definePrompt({
  name: 'draftReplyPrompt',
  input: {schema: DraftReplyInputSchema},
  output: {schema: DraftReplyOutputSchema},
  prompt: `You are an AI assistant helping users draft email replies.

  Based on the email content and any specific instructions from the user, generate a draft reply.

  Email Content: {{{emailBody}}}
  User Instructions: {{{userPrompt}}}

  Draft Reply:`, 
});

const draftReplyFlow = ai.defineFlow(
  {
    name: 'draftReplyFlow',
    inputSchema: DraftReplyInputSchema,
    outputSchema: DraftReplyOutputSchema,
  },
  async input => {
    const {output} = await draftReplyPrompt(input);
    return output!;
  }
);
