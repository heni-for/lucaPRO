'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, FileText, Tag, Trash2 } from 'lucide-react';
import { useApp } from '@/hooks/use-app';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const notes = [
    { id: 1, content: 'Next week exam', tags: ['School'], date: '2023-10-26' },
    { id: 2, content: 'Car service appointment on Monday', tags: ['Car', 'Todo'], date: '2023-10-25' },
    { id: 3, content: 'Gift idea for mom: perfume', tags: ['Family', 'Gifts'], date: '2023-10-24' },
];

export default function NotesPage() {
  const { t } = useApp();

  return (
    <div className="grid gap-6">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{t('notes_knowledge')}</h1>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                {t('add_note')}
            </Button>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>{t('add_new_note')}</CardTitle>
                <CardDescription>{t('add_new_note_description')}</CardDescription>
            </CardHeader>
            <CardContent>
                <Input placeholder={t('ask_luca_to_remember')} />
            </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {notes.map(note => (
                 <Card key={note.id} className="flex flex-col">
                    <CardContent className="pt-6 flex-1">
                      <p className="text-sm">{note.content}</p>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-2 pt-4 border-t">
                       <div className="flex items-center justify-between w-full">
                         <p className="text-xs text-muted-foreground">{note.date}</p>
                         <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                         </Button>
                       </div>
                        <div className="flex flex-wrap gap-1">
                            {note.tags.map(tag => (
                                <Badge key={tag} variant="secondary">{tag}</Badge>
                            ))}
                        </div>
                    </CardFooter>
                 </Card>
            ))}
        </div>

        {notes.length === 0 && (
            <Card className="md:col-span-2 lg:col-span-3">
                <CardContent className="flex flex-col items-center justify-center gap-4 text-center h-80">
                <FileText className="w-16 h-16 text-muted-foreground" />
                <h3 className="text-2xl font-bold tracking-tight">{t('no_notes_yet')}</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                    {t('no_notes_yet_description')}
                </p>
                </CardContent>
            </Card>
        )}
    </div>
  );
}
