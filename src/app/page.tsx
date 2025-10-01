'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Download, BotMessageSquare } from 'lucide-react';
import { Logo } from '@/components/logo';
import Link from 'next/link';

export default function RootPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-background border-b">
        <Logo />
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/emails" className="text-sm font-medium hover:underline underline-offset-4">
            Go to App
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Meet <span className="text-primary">Luca</span>, Your Smart Email Assistant
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Luca harnesses the power of AI to summarize your emails in Tunisian Derja, help you draft replies, and manage your schedule, all in one place.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/emails">
                      Get Started <ArrowRight className="ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" disabled>
                    <Download className="mr-2" /> Download Luca
                  </Button>
                </div>
              </div>
               <div className="flex items-center justify-center">
                 <BotMessageSquare className="h-48 w-48 text-primary/10 lg:h-72 lg:w-72" strokeWidth={0.5} />
               </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
