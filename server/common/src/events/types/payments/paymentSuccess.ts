import Mongoose from 'mongoose';
import { Subjects } from '../../..';
import { paymentModes, paymentStatus } from '../../../interfaces/enums';

export interface PaymentSuccessEvent {
  subject: Subjects.PaymentSuccess;

  data: {
    orderId: Mongoose.Types.ObjectId;

    version: number;

    paymentStatus: paymentStatus.paid;
    paymentMode: paymentModes;
  };
}
