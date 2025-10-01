
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
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location?: string;
  source: 'email' | 'conversation' | 'manual';
  sourceId?: string; // e.g., email.id
};
