import { Subjects } from '../../subjects';

export interface CustomProductDeletedEvent {
  subject: Subjects.CustomProductDeleted;
  data: {
    productID: string;
    version: number;
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
