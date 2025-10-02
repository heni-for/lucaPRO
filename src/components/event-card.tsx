'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { PlanningItem } from '@/lib/types';
import { Calendar as CalendarIcon, MapPin, User, Package, AlertTriangle, CheckCircle, Edit, Trash2, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface EventCardProps {
    item: PlanningItem;
    onStatusChange: (itemId: string, newStatus: PlanningItem['status']) => void;
    onDelete: (itemId: string) => void;
}

export function EventCard({ item, onStatusChange, onDelete }: EventCardProps) {

    const getStatusVariant = (status: PlanningItem['status']) => {
        switch (status) {
        case 'Confirmed':
            return 'default';
        case 'Planned':
            return 'secondary';
        case 'Canceled':
            return 'destructive';
        case 'Done':
            return 'outline';
        default:
            return 'secondary';
        }
    };

    const cycleStatus = (item: PlanningItem) => {
        if (item.status === 'Planned') {
          onStatusChange(item.id, 'Confirmed');
        } else if (item.status === 'Confirmed') {
          onStatusChange(item.id, 'Done');
        }
    };
    
    return (
        <Card key={item.id} className="bg-card flex flex-col">
            <CardHeader>
            <div className="flex items-start justify-between">
                <CardTitle className="pr-4">{item.title}</CardTitle>
                <Badge 
                    variant={getStatusVariant(item.status)}
                    className="cursor-pointer"
                    onClick={() => cycleStatus(item)}
                >
                    {item.status}
                </Badge>
            </div>
            <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm flex-1">
            <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span>{format(new Date(`${item.date}T00:00:00`), 'PPP')} at {item.time}</span>
            </div>
            
            {item.place && (
                <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{item.place}</span>
                </div>
            )}
            {item.people && item.people.length > 0 && (
                <div className="flex items-start gap-2">
                <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex flex-wrap gap-1">
                    {item.people.map(person => (
                    <Badge key={person} variant="secondary">{person}</Badge>
                    ))}
                </div>
                </div>
            )}
            {item.items && item.items.length > 0 && (
                <div className="flex items-start gap-2">
                <Package className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex flex-wrap gap-1">
                    {item.items.map(thing => (
                        <Badge key={thing} variant="outline" className="font-mono text-xs">{thing}</Badge>
                    ))}
                </div>
                </div>
            )}
            <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground border-t border-dashed mt-2">
                <AlertTriangle className="h-3 w-3" />
                <span>{`Reminder at ${item.reminder_time}`}</span>
            </div>
            </CardContent>
            <Separator />
            <CardFooter className="p-2 justify-end gap-2">
            <Button variant="ghost" size="icon">
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit</span>
            </Button>
            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => onDelete(item.id)}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
            </Button>
            {item.status === 'Planned' && (
                <Button variant="secondary" size="sm" className='ml-2' onClick={() => onStatusChange(item.id, 'Confirmed')}>
                    <CheckCircle className="mr-2 h-4 w-4"/>
                    Confirm
                </Button>
            )}
                {item.status === 'Confirmed' && new Date(`${item.date}T${item.time}`) < new Date() && (
                <Button variant="default" size="sm" className='ml-2' onClick={() => onStatusChange(item.id, 'Done')}>
                    <CheckCircle className="mr-2 h-4 w-4"/>
                    Mark as Done
                </Button>
            )}
            {item.status !== 'Canceled' && (
                <Button variant="ghost" size="sm" className='text-muted-foreground' onClick={() => onStatusChange(item.id, 'Canceled')}>
                    <XCircle className="mr-2 h-4 w-4"/>
                    Cancel
                </Button>
            )}
            </CardFooter>
        </Card>
    );
}