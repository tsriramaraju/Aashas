import { Subjects } from '../subjects';
import Mongoose from 'mongoose';
import { authType } from '../../interfaces/enums';
export interface GenerateOTPEvent {
  subject: Subjects.GenerateOTP;
  data: {
    id?: Mongoose.Types.ObjectId;
    mode: 'email' | 'mobile' | 'slack' | 'push notification';
    group?: string;
    clientID?: string;
    data: {
      title?: string;
      name?: string;
      email?: string;
      mobile?: number;
      otp: number;
      message?: string;
      img?: string;
    };
  };
}
