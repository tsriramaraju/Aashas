import { Subjects } from '../../subjects';

export interface UserDeletedEvent {
  subject: Subjects.UserDeleted;
  data: {
    id: string;
    clientID?: string;
    group?: string;
    mode: ('message' | 'email' | 'push notification')[];
    data: {
      title: string;
      name?: string;
      email?: string;
      mobile?: number;
      message: string;
      body?: string;
      img?: string;
    };
  };
}
