
export type UserProfile = {
  name: string;
  email: string;
  settings?: {
    language?: 'en' | 'fr' | 'derja';
    reminderDefault?: number;
  };
};

export type Event = {
  id?: string; // Firestore document ID
  title: string;
  description?: string;
  place?: string;
  people?: string[];
  items?: string[];
  category?: 'Meeting' | 'Travel' | 'Health' | 'Personal' | 'Work' | 'School';
  status: 'Planned' | 'Confirmed' | 'Done' | 'Canceled';
  eventDate: string; // ISO date string e.g., "2024-10-28"
  startTime: string; // "HH:mm"
  endTime?: string; // "HH:mm"
  reminderTime?: string; // "HH:mm"
  source?: 'voice' | 'chat' | 'manual';
  createdAt?: string; // ISO date-time string
  userId: string;
};

export type Reminder = {
  id?: string; // Firestore document ID
  message: string;
  remindAt: string; // ISO date-time string
  status?: 'pending' | 'done' | 'snoozed';
  userId: string;
};

export type Contact = {
  id?: string; // Firestore document ID
  name: string;
  relation?: string;
  notes?: string;
  userId: string;
};

export type Memory = {
  id?: string; // Firestore document ID
  type: 'habit' | 'note' | 'goal' | 'mood' | 'preference' | 'knowledge';
  content: string;
  metadata?: Record<string, any>;
  createdAt?: string; // ISO date-time string
  userId: string;
};

export type ChatMessage = {
  id?: string; // Firestore document ID
  sender: 'user' | 'luca';
  message: string;
  createdAt: string; // ISO date-time string
  userId: string;
};

// Merging previous types for UI that might not be in the backend yet
export type Email = {
  id: string;
  from: {
    name: string;
    email: string;
    avatar: string;
  };
  to: string;
  subject: string;
  body: string;
  snippet: string;
  isRead: boolean;
  receivedDate: string;
};

export type PlanningItem = {
    id: string;
    user_id?: string;
    title: string;
    description?: string;
    date: string;
    time: string;
    end_time?: string;
    reminder_time: string;
    place?: string;
    place_type?: 'Home' | 'Cafe' | 'Office' | 'Online' | 'Other';
    people?: string[];
    items?: string[];
    category?: 'Meeting' | 'Travel' | 'Health' | 'Work' | 'Personal';
    status: 'Planned' | 'Confirmed' | 'Done' | 'Canceled';
    source: 'voice' | 'chat'-manual';
    created_at?: string;
    updated_at?: string;
};
