'use server';

import { summarizeEmailInDerja } from '@/ai/flows/summarize-email-in-derja';

export async function getSummaryAction(emailBody: string): Promise<{ summary?: string; error?: string }> {
  if (!emailBody) {
    return { error: 'Email body is required.' };
  }
  try {
    const result = await summarizeEmailInDerja({ emailBody });
    return { summary: result.summary };
  } catch (error) {
    console.error('Error generating summary:', error);
    return { error: 'Failed to generate summary. Please try again later.' };
  }
}
