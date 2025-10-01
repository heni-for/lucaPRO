'use server';

import { summarizeEmailInDerja } from '@/ai/flows/summarize-email-in-derja';
import { draftReply } from '@/ai/flows/help-draft-reply';

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

export async function draftReplyAction(emailBody: string, userPrompt: string): Promise<{ reply?: string; error?: string }> {
  if (!emailBody || !userPrompt) {
    return { error: 'Email body and user prompt are required.' };
  }
  try {
    const result = await draftReply({ emailBody, userPrompt });
    return { reply: result.draftReply };
  } catch (error) {
    console.error('Error generating reply:', error);
    return { error: 'Failed to generate reply. Please try again later.' };
  }
}
