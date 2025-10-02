
import type { Email, PlanningItem } from './types';

export const emails: Email[] = [
  {
    id: '1',
    from: {
      name: 'Amira Fekih',
      email: 'amira.fekih@example.com',
      avatar: 'https://i.pravatar.cc/40?u=amira-fekih',
    },
    to: 'me@derjamail.com',
    subject: 'Project Alpha - Weekly Sync',
    snippet: 'Hi team, Just a reminder about our weekly sync tomorrow at 10 AM. Please come prepared with your updates.',
    body: `
      <p>Hi team,</p>
      <p>Just a reminder about our weekly sync tomorrow at 10 AM. We will discuss the progress of Project Alpha.</p>
      <p>Please come prepared with your updates on the following items:</p>
      <ul>
        <li>Frontend development progress</li>
        <li>Backend API integration status</li>
        <li>Blockers and challenges</li>
      </ul>
      <p>Looking forward to a productive meeting.</p>
      <p>Best,<br>Amira</p>
    `,
    isRead: false,
    receivedDate: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: '2',
    from: {
      name: 'Jean-Pierre Dubois',
      email: 'jp.dubois@example.com',
      avatar: 'https://i.pravatar.cc/40?u=jp-dubois',
    },
    to: 'me@derjamail.com',
    subject: 'Re: Marketing Campaign Q3',
    snippet: 'Excellent work on the initial drafts! I have a few suggestions to refine the copy. Let\'s discuss.',
    body: `
      <p>Bonjour,</p>
      <p>Excellent work on the initial drafts for the Q3 marketing campaign! The visuals are stunning.</p>
      <p>I have a few suggestions to refine the copy for the French-speaking audience. Could we schedule a brief call to discuss this week?</p>
      <p>Let me know your availability.</p>
      <p>Merci,<br>Jean-Pierre</p>
    `,
    isRead: false,
    receivedDate: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: '3',
    from: {
      name: 'Youssef Ben Ali',
      email: 'youssef.benali@example.com',
      avatar: 'https://i.pravatar.cc/40?u=youssef-ben-ali',
    },
    to: 'me@derjamail.com',
    subject: 'متابعة بخصوص الفاتورة عدد 123',
    snippet: 'السلام، نرجو منكم متابعة الفاتورة عدد 123 التي لم يتم خلاصها بعد. شكرا لتفهمكم.',
    body: `
      <p>السلام عليكم،</p>
      <p>تحية طيبة وبعد،</p>
      <p>نرجو منكم متابعة الفاتورة عدد 123 بتاريخ 15 جوان، والتي يبدو أنها لم تتم تسويتها بعد.</p>
      <p>الرجاء إعلامنا في حال وجود أي مشكلة أو استفسار.</p>
      <p>شكرا لتعاونكم.</p>
      <p>مع تحياتي،<br>يوسف بن علي</p>
    `,
    isRead: true,
    receivedDate: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: '4',
    from: {
      name: 'Design Weekly',
      email: 'newsletter@designweekly.io',
      avatar: 'https://i.pravatar.cc/40?u=design-weekly',
    },
    to: 'me@derjamail.com',
    subject: 'Your Weekly Dose of Design Inspiration',
    snippet: 'This week, we explore the rise of brutalism in web design, plus free resources and tools.',
    body: `
      <p>Hello Designer!</p>
      <p>Welcome to your weekly dose of inspiration. This week, we're diving deep into the fascinating world of digital brutalism. Is it a fleeting trend or a revolution against polished perfection?</p>
      <h3>Featured Articles:</h3>
      <ul>
        <li>The Raw Power of Brutalist Web Design</li>
        <li>Case Study: How a Brutalist Redesign Increased User Engagement</li>
      </ul>
      <h3>Freebies:</h3>
      <p>A set of 50+ high-resolution texture maps, free for personal and commercial use.</p>
      <p>Stay creative,<br>The Design Weekly Team</p>
    `,
    isRead: true,
    receivedDate: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: '5',
    from: {
      name: 'Fatma Charni',
      email: 'fatma.charni@example.com',
      avatar: 'https://i.pravatar.cc/40?u=fatma-charni',
    },
    to: 'me@derjamail.com',
    subject: 'Quick question about the new feature',
    snippet: 'Hey! Hope you\'re having a great day. I had a quick question about the implementation of the new AI summarizer.',
    body: `
      <p>Hey!</p>
      <p>Hope you're having a great day.</p>
      <p>I was looking at the new AI summarizer feature and it looks amazing. I had a quick technical question: are we handling rate limiting on the client-side or is it purely a backend concern?</p>
      <p>Just curious about the architecture. No rush on the reply!</p>
      <p>Thanks,<br>Fatma</p>
    `,
    isRead: true,
    receivedDate: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
];

export const planningItems: PlanningItem[] = [
    {
      id: 'evt-1',
      title: 'Coffee with Asmaani',
      description: 'Morning coffee before project discussion',
      date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0],
      time: '09:00',
      reminder_time: '08:30',
      place: 'Lac, Tunis',
      people: ['Asmaani'],
      items: ['Laptop'],
      category: 'Personal',
      status: 'Planned',
      source: 'voice',
    },
    {
      id: 'evt-2',
      title: 'Take Diabetes Medicine',
      description: 'Daily medicine reminder',
      date: new Date().toISOString().split('T')[0],
      time: '20:00',
      reminder_time: '19:50',
      place: 'Home',
      people: [],
      items: ['Medicine box'],
      category: 'Health',
      status: 'Planned',
      source: 'manual',
    },
    {
      id: 'evt-3',
      title: 'Trip to Sousse with Ahmed',
      description: 'Weekend trip',
      date: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().split('T')[0],
      time: '07:00',
      reminder_time: '06:30',
      place: 'Tunis Station',
      people: ['Ahmed'],
      items: ['Bag', 'Tickets'],
      category: 'Travel',
      status: 'Confirmed',
      source: 'voice',
    },
];
