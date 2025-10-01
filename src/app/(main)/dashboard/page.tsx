'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Clock, Mail, Users, Star } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, XAxis, YAxis, CartesianGrid, BarChart as RechartsBarChart } from "recharts";
import { useApp } from '@/hooks/use-app';


const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Emails",
    color: "hsl(var(--primary))",
  },
}

export default function DashboardPage() {
    const { t, dir } = useApp();
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4" dir={dir}>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
                {t('total_emails_processed')}
            </CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">12,543</div>
            <p className="text-xs text-muted-foreground">
                {t('from_last_month')}
            </p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
                {t('avg_summarization_speed')}
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">3.2s</div>
            <p className="text-xs text-muted-foreground">
                {t('speed_improvement')}
            </p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('active_users')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
                {t('active_users_description')}
            </p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('summarization_accuracy')}</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
                {t('accuracy_feedback')}
            </p>
            </CardContent>
        </Card>
        <Card className="col-span-1 md:col-span-2 lg:col-span-4">
            <CardHeader>
                <CardTitle>{t('email_volume_trends')}</CardTitle>
                <CardDescription>{t('email_volume_description')}</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                 <ChartContainer config={chartConfig} className="w-full h-[300px]">
                    <RechartsBarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        />
                        <YAxis />
                        <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
                    </RechartsBarChart>
                </ChartContainer>
            </CardContent>
      </Card>
    </div>
  );
}
