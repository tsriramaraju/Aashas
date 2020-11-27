import Mongoose from 'mongoose';
import { Subjects } from '../../..';
import { paymentModes, paymentStatus } from '../../../interfaces/enums';

export interface PaymentSuccessEvent {
  subject: Subjects.PaymentSuccess;

  data: {
    orderId: Mongoose.Types.ObjectId;
    clientID?: string;
    version: number;
    group?: string;
    mode: 'message' | 'email' | 'push notification';
    paymentStatus: paymentStatus.paid;
    paymentMode: paymentModes;
    data: {
      title?: string;
      name?: string;
      email?: string;
      mobile?: number;
      message: string;
      body: string;
      img?: string;
    };
  };
}
