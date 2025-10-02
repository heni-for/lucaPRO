
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
    source: 'voice' | 'chat' | 'manual';
    created_at?: string;
    updated_at?: string;
};

export type ChatMessage = {
  role: 'user' | 'model';
  content: string;
};
