'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Briefcase, GraduationCap, ClipboardCheck } from 'lucide-react';
import { useApp } from '@/hooks/use-app';

export default function WorkAndSchoolPage() {
  const { t } = useApp();

  return (
    <div className="grid gap-6">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{t('work_school')}</h1>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                {t('add_project_deadline')}
            </Button>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>{t('projects')}</CardTitle>
          <CardDescription>{t('projects_description')}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4 text-center h-48">
            <Briefcase className="w-12 h-12 text-muted-foreground" />
            <p className="text-lg font-semibold">{t('no_projects')}</p>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
               {t('no_projects_description')}
            </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('exams_deadlines')}</CardTitle>
          <CardDescription>{t('exams_deadlines_description')}</CardDescription>
        </CardHeader>
         <CardContent className="flex flex-col items-center justify-center gap-4 text-center h-48">
            <GraduationCap className="w-12 h-12 text-muted-foreground" />
            <p className="text-lg font-semibold">{t('no_exams_deadlines')}</p>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
               {t('no_exams_deadlines_description')}
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
