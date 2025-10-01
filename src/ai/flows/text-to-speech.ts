'use server';

/**
 * @fileOverview Converts text to speech using a Genkit flow.
 *
 * - generateAudioFromText - A function that takes text and returns a data URL for the generated audio.
 * - GenerateAudioFromTextInput - The input type for the generateAudioFromText function.
 * - GenerateAudioFromTextOutput - The return type for the generateAudioFromText function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import wav from 'wav';
import { googleAI } from '@genkit-ai/google-genai';


const GenerateAudioFromTextInputSchema = z.string();
export type GenerateAudioFromTextInput = z.infer<typeof GenerateAudioFromTextInputSchema>;

const GenerateAudioFromTextOutputSchema = z.object({
    audioUrl: z.string().describe('The data URL of the generated audio file.'),
});
export type GenerateAudioFromTextOutput = z.infer<typeof GenerateAudioFromTextOutputSchema>;

export async function generateAudioFromText(input: GenerateAudioFromTextInput): Promise<GenerateAudioFromTextOutput> {
    return textToSpeechFlow(input);
}

async function toWav(
    pcmData: Buffer,
    channels = 1,
    rate = 24000,
    sampleWidth = 2
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const writer = new wav.Writer({
        channels,
        sampleRate: rate,
        bitDepth: sampleWidth * 8,
      });
  
      let bufs = [] as any[];
      writer.on('error', reject);
      writer.on('data', function (d) {
        bufs.push(d);
      });
      writer.on('end', function () {
        resolve(Buffer.concat(bufs).toString('base64'));
      });
  
      writer.write(pcmData);
      writer.end();
    });
  }

const textToSpeechFlow = ai.defineFlow(
    {
        name: 'textToSpeechFlow',
        inputSchema: GenerateAudioFromTextInputSchema,
        outputSchema: GenerateAudioFromTextOutputSchema,
    },
    async (text) => {
        const { media } = await ai.generate({
            model: googleAI.model('gemini-2.5-flash-preview-tts'),
            config: {
                responseModalities: ['AUDIO'],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Algenib' }, // A voice that supports Arabic
                    },
                },
            },
            prompt: text,
        });

        if (!media || !media.url) {
            throw new Error('No audio media returned from the TTS model.');
        }

        const audioBuffer = Buffer.from(
            media.url.substring(media.url.indexOf(',') + 1),
            'base64'
        );

        const wavBase64 = await toWav(audioBuffer);
        
        return {
            audioUrl: `data:audio/wav;base64,${wavBase64}`,
        };
    }
);
