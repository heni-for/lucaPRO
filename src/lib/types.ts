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
