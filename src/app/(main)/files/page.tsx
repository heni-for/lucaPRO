'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadCloud, File, Image as ImageIcon, HardDrive } from 'lucide-react';
import { useApp } from '@/hooks/use-app';

export default function FilesPage() {
  const { t } = useApp();

  return (
    <div className="grid gap-6">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{t('files_docs')}</h1>
            <Button>
                <UploadCloud className="mr-2 h-4 w-4" />
                {t('upload_file')}
            </Button>
      </div>

       <Card className="col-span-full">
        <CardHeader>
          <CardTitle>{t('file_storage')}</CardTitle>
          <CardDescription>{t('file_storage_description')}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4 text-center h-80 border-2 border-dashed rounded-lg">
            <HardDrive className="w-20 h-20 text-muted-foreground" />
            <h3 className="text-2xl font-bold tracking-tight">{t('drag_drop_files')}</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
                {t('drag_drop_files_description')}
            </p>
             <Button variant="secondary" className="mt-4">
                {t('browse_files')}
            </Button>
        </CardContent>
      </Card>
      
    </div>
  );
}
