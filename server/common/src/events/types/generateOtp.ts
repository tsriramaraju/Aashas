import { Subjects } from '../subjects';
import Mongoose from 'mongoose';
export interface GenerateOTPEvent {
  subject: Subjects.GenerateOTP;
  data: {
    id?: Mongoose.Types.ObjectId | string;
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
