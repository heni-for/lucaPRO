'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useApp } from '@/hooks/use-app';
import type { PlanningItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from './ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const formSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  description: z.string().optional(),
  date: z.date({ required_error: 'A date is required.'}),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:mm)'),
  reminder_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:mm)'),
  place: z.string().optional(),
  people: z.string().optional(),
  items: z.string().optional(),
  category: z.enum(['Meeting', 'Travel', 'Health', 'Personal', 'Work', 'School']),
});

type FormData = z.infer<typeof formSchema>;

interface AddEventDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onEventCreated: (event: Omit<PlanningItem, 'id' | 'source' | 'status' | 'created_at'>) => void;
}

export function AddEventDialog({ isOpen, onOpenChange, onEventCreated }: AddEventDialogProps) {
  const { t, dir } = useApp();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      time: '12:00',
      reminder_time: '11:30',
      place: '',
      people: '',
      items: '',
      category: 'Personal',
    },
  });

  function onSubmit(values: FormData) {
    const { people, items, ...rest } = values;
    onEventCreated({
        ...rest,
        date: values.date.toISOString().split('T')[0],
        people: people ? people.split(',').map(p => p.trim()) : [],
        items: items ? items.split(',').map(i => i.trim()) : [],
    });
    form.reset();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl" dir={dir}>
        <DialogHeader>
          <DialogTitle>{t('add_event')}</DialogTitle>
          <DialogDescription>{t('no_events_description')}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Coffee with a friend" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Date</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                )}
                                >
                                {field.value ? (
                                    format(field.value, "PPP")
                                ) : (
                                    <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                    date < new Date(new Date().setHours(0,0,0,0)) 
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="Personal">Personal</SelectItem>
                            <SelectItem value="Work">Work</SelectItem>
                            <SelectItem value="Meeting">Meeting</SelectItem>
                            <SelectItem value="Health">Health</SelectItem>
                            <SelectItem value="School">School</SelectItem>
                            <SelectItem value="Travel">Travel</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Event Time</FormLabel>
                        <FormControl>
                            <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="reminder_time"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Reminder Time</FormLabel>
                        <FormControl>
                            <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Details about the event..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <FormField
                    control={form.control}
                    name="people"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>People</FormLabel>
                        <FormControl>
                            <Input placeholder="Asmaani, Ahmed (comma-separated)" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="items"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Items to bring</FormLabel>
                        <FormControl>
                            <Input placeholder="Laptop, Bag (comma-separated)" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
             <FormField
                control={form.control}
                name="place"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Place</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Lac, Tunis" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <DialogFooter className='pt-4'>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                {t('cancel')}
              </Button>
              <Button type="submit">Create Event</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
