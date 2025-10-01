'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApp } from '@/hooks/use-app';

export default function SettingsPage() {
  const { t, dir } = useApp();

  return (
    <div className="grid gap-6" dir={dir}>
        <Card>
        <CardHeader>
            <CardTitle>{t('ai_settings')}</CardTitle>
            <CardDescription>{t('ai_settings_description')}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
            <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="ollama-enabled" className="flex flex-col space-y-1">
                <span>{t('derja_model_label')}</span>
                <span className="font-normal leading-snug text-muted-foreground">
                    {t('derja_model_description')}
                </span>
                </Label>
                <Switch id="ollama-enabled" defaultChecked disabled />
            </div>
            <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="tts-enabled" className="flex flex-col space-y-1">
                <span>{t('tts_label')}</span>
                <span className="font-normal leading-snug text-muted-foreground">
                    {t('tts_description')}
                </span>
                </Label>
                <Switch id="tts-enabled" defaultChecked />
            </div>
        </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>{t('processing_parameters')}</CardTitle>
                <CardDescription>{t('processing_parameters_description')}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                 <div className="grid gap-2">
                    <Label htmlFor="temperature">{t('temperature_label')}</Label>
                    <Slider id="temperature" defaultValue={[0.5]} max={1} step={0.1} disabled />
                    <p className="text-sm text-muted-foreground">{t('temperature_description')}</p>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="max-tokens">{t('max_tokens_label')}</Label>
                    <Slider id="max-tokens" defaultValue={[256]} min={50} max={512} step={16} disabled />
                    <p className="text-sm text-muted-foreground">{t('max_tokens_description')}</p>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>{t('email_sync')}</CardTitle>
                <CardDescription>{t('email_sync_description')}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                 <div className="grid gap-2">
                    <Label htmlFor="sync-interval">{t('sync_interval_label')}</Label>
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
                    <p className="text-sm text-muted-foreground">{t('sync_interval_description')}</p>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
