'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApp } from '@/hooks/use-app';

export default function SettingsPage() {
  const { t } = useApp();

  return (
    <div className="grid gap-6">
        <Card>
        <CardHeader>
            <CardTitle>AI Configuration</CardTitle>
            <CardDescription>Manage settings for AI models and processing parameters.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
            <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="ollama-enabled" className="flex flex-col space-y-1">
                <span>Derja Model (Ollama)</span>
                <span className="font-normal leading-snug text-muted-foreground">
                    Enable custom Derja language model for summaries and replies.
                </span>
                </Label>
                <Switch id="ollama-enabled" defaultChecked disabled />
            </div>
            <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="tts-enabled" className="flex flex-col space-y-1">
                <span>Text-to-Speech (TTS)</span>
                <span className="font-normal leading-snug text-muted-foreground">
                    Enable voice output for summaries in Derja.
                </span>
                </Label>
                <Switch id="tts-enabled" defaultChecked />
            </div>
        </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Processing Parameters</CardTitle>
                <CardDescription>Fine-tune the behavior of the AI models.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                 <div className="grid gap-2">
                    <Label htmlFor="temperature">Temperature</Label>
                    <Slider id="temperature" defaultValue={[0.5]} max={1} step={0.1} disabled />
                    <p className="text-sm text-muted-foreground">Controls randomness. Lower is more deterministic.</p>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="max-tokens">Max Tokens</Label>
                    <Slider id="max-tokens" defaultValue={[256]} min={50} max={512} step={16} disabled />
                    <p className="text-sm text-muted-foreground">Maximum length of the generated summary or reply.</p>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Email Sync</CardTitle>
                <CardDescription>Configure how Luca fetches your emails.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                 <div className="grid gap-2">
                    <Label htmlFor="sync-interval">Sync Interval</Label>
                    <Select defaultValue="5" disabled>
                        <SelectTrigger id="sync-interval" className="w-[180px]">
                            <SelectValue placeholder="Select interval" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">5 minutes</SelectItem>
                            <SelectItem value="10">10 minutes</SelectItem>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">How often to check for new emails.</p>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
