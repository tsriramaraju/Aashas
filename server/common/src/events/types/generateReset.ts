import { Subjects } from '../subjects';
import Mongoose from 'mongoose';

export interface GenerateResetEvent {
  subject: Subjects.GenerateReset;
  data: {
    id?: Mongoose.Types.ObjectId;
    mode: 'email' | 'mobile' | 'slack';
    group?: string;
    clientID?: string;
    data: {
      title?: string;
      name?: string;
      email?: string;
      mobile?: number;
      uid: string;
      message?: string;
      img?: string;
    };
  };
}
