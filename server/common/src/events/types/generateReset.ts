import { Subjects } from '../subjects';

export interface GenerateResetEvent {
  subject: Subjects.GenerateReset;
  data: {
    id?: string;
    mode: ('email' | 'mobile')[];
    group?: string;
    clientID?: string;
    data: {
      title: string;
      name?: string;
      email?: string;
      mobile?: number;
      uid: string;
      message: string;
      img?: string;
      body?: string;
    };
  };
}
