'use server';

import { summarizeEmailInDerja } from '@/ai/flows/summarize-email-in-derja';
import { draftReply } from '@/ai/flows/help-draft-reply';
import { generateAudioFromText } from '@/ai/flows/text-to-speech';
import { continueConversation } from '@/ai/flows/conversational-chat';
import type { ChatMessage } from '@/lib/types';


//==============================================================================
// AI & Chat Actions
//==============================================================================

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

export async function textToSpeechAction(text: string): Promise<{ audioUrl?: string; error?: string }> {
  if (!text) {
    return { error: 'Text is required for TTS.' };
  }
  try {
    const result = await generateAudioFromText(text);
    return { audioUrl: result.audioUrl };
  } catch (error) {
    console.error('Error generating audio:', error);
    return { error: 'Failed to generate audio. Please try again later.' };
  }
}

export async function chatWithHistoryAction(history: ChatMessage[]): Promise<{ reply?: string; error?: string }> {
  if (!history || history.length === 0) {
    return { error: 'Chat history is required.' };
  }
  try {
    // In a real app, you'd also save the user message and the bot's reply to the DB here.
    // await saveChatMessageAction({ userId, message: history[history.length-1] });
    const result = await continueConversation({ history });
    // await saveChatMessageAction({ userId, message: { role: 'model', content: result.reply } });
    return { reply: result.reply };
  } catch (error) {
    console.error('Error in conversation:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to get a response. Please try again.';
    return { error: errorMessage };
  }
}

export async function listChatMessagesAction(userId: string): Promise<{ messages?: ChatMessage[]; error?: string }> {
    console.log('Fetching chat history for user:', userId);
    // TODO: Implement database logic to fetch chat messages
    return { messages: [] };
}
