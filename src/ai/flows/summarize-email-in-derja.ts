'use server';

/**
 * @fileOverview Summarizes emails in Derja (Tunisian Arabic).
 *
 * This file exports:
 * - `summarizeEmailInDerja`: A function that takes an email body and returns a Derja summary.
 * - `SummarizeEmailInDerjaInput`: The input type for the summarizeEmailInDerja function (email body).
 * - `SummarizeEmailInDerjaOutput`: The return type for the summarizeEmailInDerja function (Derja summary).
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeEmailInDerjaInputSchema = z.object({
  emailBody: z.string().describe('The content of the email to summarize.'),
});
export type SummarizeEmailInDerjaInput = z.infer<typeof SummarizeEmailInDerjaInputSchema>;

const SummarizeEmailInDerjaOutputSchema = z.object({
  summary: z.string().describe('The summary of the email in Derja.'),
});
export type SummarizeEmailInDerjaOutput = z.infer<typeof SummarizeEmailInDerjaOutputSchema>;

export async function summarizeEmailInDerja(input: SummarizeEmailInDerjaInput): Promise<SummarizeEmailInDerjaOutput> {
  return summarizeEmailInDerjaFlow(input);
}

const summarizeEmailInDerjaPrompt = ai.definePrompt({
  name: 'summarizeEmailInDerjaPrompt',
  input: {schema: SummarizeEmailInDerjaInputSchema},
  output: {schema: SummarizeEmailInDerjaOutputSchema},
  prompt: `You are an AI assistant specializing in summarizing emails in Derja (Tunisian Arabic).
  Please provide a concise and accurate summary of the following email in Derja. Keep the summary under 200 characters. 
  Email Body: {{{emailBody}}}`,
});

const summarizeEmailInDerjaFlow = ai.defineFlow(
  {
    name: 'summarizeEmailInDerjaFlow',
    inputSchema: SummarizeEmailInDerjaInputSchema,
    outputSchema: SummarizeEmailInDerjaOutputSchema,
  },
  async input => {
    const {output} = await summarizeEmailInDerjaPrompt(input);
    return output!;
  }
);
