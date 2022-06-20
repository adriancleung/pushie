import {User} from './user';

export type Notification = {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  label: string;
  timestamp: string;
  user: User;
};
