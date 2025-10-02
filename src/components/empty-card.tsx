'use client';

import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface EmptyCardProps {
    Icon: LucideIcon;
    title: string;
    description: string;
}

export function EmptyCard({ Icon, title, description }: EmptyCardProps) {
    return (
        <Card className="bg-card">
            <CardContent className="flex flex-col items-center justify-center gap-4 text-center h-80">
              <Icon className="w-16 h-16 text-muted-foreground" />
              <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                {description}
              </p>
            </CardContent>
        </Card>
    )
}
