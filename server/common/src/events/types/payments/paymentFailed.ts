import Mongoose from 'mongoose';
import { Subjects } from '../../..';
import { paymentModes, paymentStatus } from '../../../interfaces/enums';

export interface PaymentFailedEvent {
  subject: Subjects.PaymentFailed;

  data: {
    orderId: Mongoose.Types.ObjectId;
    clientID?: string;
    group?: string;
    mode: 'message' | 'email' | 'push notification';
    paymentStatus: paymentStatus.failed;
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
