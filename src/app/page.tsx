'use client';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useApp } from '@/hooks/use-app';

export default function RootPage() {
  const { t, dir } = useApp();
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-background border-b">
        <Logo />
      </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                <div className="flex flex-col justify-center space-y-4" dir={dir}>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                            {t('welcome_back')} <span className="text-primary">Luca</span>
                        </h1>
                        <p className="max-w-[600px] text-muted-foreground md:text-xl">
                            {t('app_description')}
                        </p>
                    </div>
                </div>
                 <Card dir={dir}>
                    <CardHeader>
                        <CardTitle>{t('login')}</CardTitle>
                        <CardDescription>{t('login_description')}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">{t('email_label')}</Label>
                            <Input id="email" type="email" placeholder="m@example.com" defaultValue="user@derjamail.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">{t('password_label')}</Label>
                            <Input id="password" type="password" defaultValue="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button asChild className="w-full">
                            <Link href="/emails">
                                {t('login')}
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
      </main>
    </div>
  );
}
