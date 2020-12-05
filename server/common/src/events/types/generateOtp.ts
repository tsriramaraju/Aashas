import { Subjects } from '../subjects';

export interface GenerateOTPEvent {
  subject: Subjects.GenerateOTP;
  data: {
    id?: string;
    mode: ('email' | 'message' | 'push notification')[];
    group?: string;
    clientID?: string;
    data: {
      title: string;
      name?: string;
      email?: string;
      mobile?: number;
      otp: number;
      message: string;
      img?: string;
      body?: string;
    };
  };
}
