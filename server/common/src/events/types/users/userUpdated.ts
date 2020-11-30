import { Subjects } from '../../subjects';
import Mongoose from 'mongoose';

export interface UserUpdatedEvent {
  subject: Subjects.UserUpdated;
  data: {
    id: Mongoose.Types.ObjectId;
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
