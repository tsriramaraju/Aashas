import { Types } from 'mongoose';
import { Subjects } from '../subjects';

export interface GenerateResetEvent {
  subject: Subjects.GenerateReset;
  data: {
    id?: Types.ObjectId;
    mode: ('email' | 'mobile')[];
    group?: string;
    clientID?: string;
    data: {
      title: string;
      name?: string;
      email?: string;
      mobile?: number;
      uid: Types.ObjectId;
      message: string;
      img?: string;
      body?: string;
    };
  };
}
