import {User} from './user';

export type Notification = {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  labels: string[];
  timestamp: string;
  user: User;
};
